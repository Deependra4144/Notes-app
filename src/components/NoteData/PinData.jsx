import { useEffect, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"
import { MdPushPin } from "react-icons/md"
import { handlePinn, movetoRecycleBin, undeletedNotes } from "../../assets/StorageData"
import { useNavigate } from "react-router-dom"
import ReactDOMServer from 'react-dom/server'
import Swal from "sweetalert2"
import DetailedNote from "../../assets/DetailedNote"
import { IoStarOutline } from "react-icons/io5"

function PinData() {
    const [pinnedNotes, setPinnedNotes] = useState([])
    const navigate = useNavigate()

    const handleDelete = (index, event) => {
        event.stopPropagation()
        let updateNotes = [...pinnedNotes]
        updateNotes[index].isDeleted = !updateNotes[index].isDeleted
        movetoRecycleBin(updateNotes[index].Id)
        const arr = updateNotes.filter((_, i) => i !== index)
        setPinnedNotes([...arr])
        Swal.fire('Note is Deleted')
    }

    const handleEdit = (i, event) => {
        event.stopPropagation()
        const noteToEdit = pinnedNotes[i]
        navigate('/addnotes', { state: { note: noteToEdit, index: i } })
    }

    const setpin = (index, event) => {
        event.stopPropagation()
        let updatedNotes = [...pinnedNotes]
        updatedNotes[index].ispinned = !updatedNotes[index].ispinned
        handlePinn(updatedNotes[index].Id)
        const arr = updatedNotes.filter((_, i) => i !== index)
        setPinnedNotes([...arr])
    }

    const handleDetails = (i) => {
        let obj = pinnedNotes[i]
        Swal.fire({
            html: ReactDOMServer.renderToString(<DetailedNote obj={obj} />),
            width: "50%",
            showConfirmButton: false,
        })
    }

    useEffect(() => {
        const storedNotes = undeletedNotes().filter(note => note.ispinned)
        setPinnedNotes(storedNotes)
    }, [])

    if (pinnedNotes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">📌</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No Pinned Notes</h3>
                <p className="text-gray-500">Pin your important notes to see them here!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-gray-600">
                <IoStarOutline size={20} />
                <h2 className="text-lg font-medium">Pinned Notes ({pinnedNotes.length})</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pinnedNotes.map((note, i) => (
                    <div
                        key={note.Id}
                        onClick={() => { handleDetails(i) }}
                        className="group bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-blue-100"
                    >
                        <div className="relative p-4">
                            {/* Pin Icon Overlay */}
                            <div className="absolute -top-1 -right-1 w-12 h-12 overflow-hidden">
                                <div className="absolute transform rotate-45 bg-blue-600 text-white py-1 px-6 -right-6 -top-2">
                                    <MdPushPin size={12} className="transform -rotate-45" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <h3 className="text-lg font-medium text-gray-800 line-clamp-1 pr-6">
                                    {note.task}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-200">
                                {note.discription}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 text-sm rounded-full ${note.priority === 'Low' ? 'bg-green-100 text-green-700' :
                                    note.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                    {note.priority}
                                </span>
                                <span className="text-sm text-gray-500">{note.day}</span>
                            </div>

                            <div className="flex justify-end gap-1 mt-4 pt-3 border-t border-blue-100">
                                <button
                                    onClick={(event) => { handleEdit(i, event) }}
                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                                    title="Edit Note"
                                >
                                    <CiEdit size={20} />
                                </button>
                                <button
                                    onClick={(event) => { setpin(i, event) }}
                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                                    title="Unpin Note"
                                >
                                    <MdPushPin size={20} />
                                </button>
                                <button
                                    onClick={(event) => { handleDelete(i, event) }}
                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-blue-50"
                                    title="Delete Note"
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PinData