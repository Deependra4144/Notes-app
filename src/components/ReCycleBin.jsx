import { useNavigate } from 'react-router-dom'
import { deletedNotes, permanentlyDelete, restoreNote } from '../assets/StorageData'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineRestore } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'
import { IoTrashBinOutline, IoAddOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'

function ReCycleBin() {
    const [dlNote, setdlNote] = useState([])
    const [selectedNotes, setSelectedNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const { isDark } = useTheme()

    const handleNavigate = () => {
        navigate('/addnotes')
    }

    const handleRestore = (index) => {
        let arr = deletedNotes()
        let obj = arr[index]
        restoreNote(obj.Id)
        const updatedNotes = arr.filter((_, i) => i !== index)
        setdlNote([...updatedNotes])
        toast.success('Note restored successfully')
    }

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This note will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
            background: isDark ? '#1F2937' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : '#000000'
        }).then((result) => {
            if (result.isConfirmed) {
                let arr = deletedNotes()
                let obj = arr[index]
                permanentlyDelete(obj.Id)
                const updatedNotes = arr.filter((_, i) => i !== index)
                setdlNote([...updatedNotes])
                toast.success('Note permanently deleted')
            }
        })
    }

    const handleBatchRestore = async () => {
        if (selectedNotes.length === 0) {
            toast.error('Please select notes to restore')
            return
        }

        try {
            const result = await Swal.fire({
                title: 'Restore Selected Notes?',
                text: `Restore ${selectedNotes.length} selected note(s)?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, restore them!',
                background: isDark ? '#1F2937' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#000000'
            })

            if (result.isConfirmed) {
                await Promise.all(selectedNotes.map(async (noteId) => {
                    await restoreNote(noteId)
                }))

                const updatedNotes = dlNote.filter(note => !selectedNotes.includes(note.Id))
                setdlNote(updatedNotes)
                setSelectedNotes([])
                toast.success('Selected notes restored successfully')
            }
        } catch {
            toast.error('Failed to restore selected notes')
        }
    }

    const handleBatchDelete = async () => {
        if (selectedNotes.length === 0) {
            toast.error('Please select notes to delete')
            return
        }

        try {
            const result = await Swal.fire({
                title: 'Delete Selected Notes?',
                text: `Permanently delete ${selectedNotes.length} selected note(s)?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, delete them!',
                background: isDark ? '#1F2937' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#000000'
            })

            if (result.isConfirmed) {
                await Promise.all(selectedNotes.map(async (noteId) => {
                    await permanentlyDelete(noteId)
                }))

                const updatedNotes = dlNote.filter(note => !selectedNotes.includes(note.Id))
                setdlNote(updatedNotes)
                setSelectedNotes([])
                toast.success('Selected notes permanently deleted')
            }
        } catch {
            toast.error('Failed to delete selected notes')
        }
    }

    const toggleNoteSelection = (noteId) => {
        setSelectedNotes(prev =>
            prev.includes(noteId)
                ? prev.filter(id => id !== noteId)
                : [...prev, noteId]
        )
    }

    useEffect(() => {
        const loadNotes = async () => {
            setIsLoading(true)
            try {
                let arr = deletedNotes()
                setdlNote([...arr])
            } catch {
                console.error('Error loading deleted notes')
                toast.error('Failed to load deleted notes')
            } finally {
                setIsLoading(false)
            }
        }
        loadNotes()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} 
                            transition-transform duration-300 hover:scale-110 cursor-pointer`}
                            onClick={() => navigate('/')}
                            title="Back to Notes"
                        >
                            <IoTrashBinOutline
                                className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'} 
                                transition-colors hover:text-blue-500`}
                            />
                        </div>
                        <div>
                            <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Recycle Bin
                            </h1>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {dlNote.length} deleted {dlNote.length === 1 ? 'note' : 'notes'}
                                {selectedNotes.length > 0 && ` (${selectedNotes.length} selected)`}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {selectedNotes.length > 0 && (
                            <>
                                <button
                                    onClick={handleBatchRestore}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 
                                        ${isDark
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-green-50 hover:bg-green-100 text-green-600'}`}
                                >
                                    <MdOutlineRestore size={16} />
                                    <span>Restore Selected</span>
                                </button>
                                <button
                                    onClick={handleBatchDelete}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 
                                        ${isDark
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
                                >
                                    <AiOutlineDelete size={16} />
                                    <span>Delete Selected</span>
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleNavigate}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 
                                ${isDark
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}
                                transform hover:scale-105 active:scale-95`}
                        >
                            <IoAddOutline className="w-5 h-5" />
                            <span>New Note</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Notes Grid */}
            {dlNote.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {dlNote.map((note, index) => (
                        <div
                            key={note.Id}
                            className={`group relative rounded-xl overflow-hidden transition-all duration-300 
                                ${isDark
                                    ? 'bg-gray-800 hover:shadow-lg hover:shadow-red-500/10'
                                    : 'bg-white hover:shadow-lg hover:shadow-red-500/5'}
                                ${selectedNotes.includes(note.Id) ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            {/* Selection Checkbox */}
                            <div className="absolute top-2 left-2 z-10">
                                <input
                                    type="checkbox"
                                    checked={selectedNotes.includes(note.Id)}
                                    onChange={() => toggleNoteSelection(note.Id)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </div>

                            {/* Delete Warning Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className={`text-lg font-medium line-clamp-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                        {note.task}
                                    </h3>
                                </div>

                                <p className={`text-sm line-clamp-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {note.discription}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 text-sm rounded-full ${note.priority === 'Low'
                                        ? 'bg-green-100 text-green-700'
                                        : note.priority === 'Medium'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                        {note.priority}
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {note.day}
                                    </span>
                                </div>

                                <div className={`flex justify-end gap-2 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        onClick={() => handleRestore(index)}
                                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDark
                                            ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                                            : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                                            }`}
                                        title="Restore Note"
                                    >
                                        <MdOutlineRestore
                                            size={20}
                                            className="transition-transform duration-300 transform group-hover:rotate-[-360deg]"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDark
                                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                                            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                                            }`}
                                        title="Delete Permanently"
                                    >
                                        <AiOutlineDelete
                                            size={20}
                                            className="transition-transform duration-300 transform group-hover:rotate-[15deg]"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`rounded-xl p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <div className="flex flex-col items-center justify-center">
                        <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} 
                            transition-all duration-300 hover:scale-110 cursor-pointer`}
                            onClick={() => navigate('/')}
                            title="Back to Notes"
                        >
                            <IoTrashBinOutline
                                className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'} 
                                transition-colors hover:text-blue-500`}
                            />
                        </div>
                        <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            Recycle Bin is Empty
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Deleted notes will appear here
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReCycleBin