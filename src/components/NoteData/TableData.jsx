import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { handlePinn, movetoRecycleBin, undeletedNotes } from "../../assets/StorageData";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import Swal from "sweetalert2"
import DetailedNote from "../../assets/DetailedNote";

function TableData() {
    const [showNotes, setshowNotes] = useState([]);
    const navigate = useNavigate()

    const handleDelete = (index, event) => {
        let updateNotes = [...showNotes];
        updateNotes[index].isDeleted = !updateNotes[index].isDeleted;
        movetoRecycleBin(updateNotes[index].Id);
        const arr = updateNotes.filter((_, i) => i !== index)
        setshowNotes([...arr]);
        event.stopPropagation()
        Swal.fire('Note is Deleted',)
    };

    const handleEdit = (i, event) => {
        event.stopPropagation();
        const noteToEdit = showNotes[i];
        navigate('/addnotes', { state: { note: noteToEdit, index: i } });
    };

    const setpin = (index, event) => {
        event.stopPropagation();
        let updatedNotes = [...showNotes];
        updatedNotes[index].ispinned = !updatedNotes[index].ispinned;
        handlePinn(updatedNotes[index].Id);
        setshowNotes(updatedNotes);
    }

    const handleDetails = (i) => {
        let obj = showNotes[i];
        Swal.fire({
            html: ReactDOMServer.renderToString(<DetailedNote obj={obj} />),
            width: "50%",
            showConfirmButton: false
        })
    }

    useEffect(() => {
        const storedNotes = undeletedNotes()
        setshowNotes(storedNotes.length > 0 ? storedNotes : []);
    }, [])

    if (showNotes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No Notes Yet</h3>
                <p className="text-gray-500">Create your first note to get started!</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {showNotes.map((note, i) => (
                        <tr
                            key={note.Id}
                            onClick={() => { handleDetails(i) }}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={(event) => { setpin(i, event) }}
                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    {note.ispinned ? <MdPushPin size={20} /> : <MdOutlinePushPin size={20} />}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                    {note.task}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 line-clamp-1">
                                    {note.discription}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 text-sm rounded-full ${note.priority === 'Low' ? 'bg-green-100 text-green-700' :
                                    note.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                    {note.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {note.day}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex gap-2">
                                    <button
                                        onClick={(event) => { handleEdit(i, event) }}
                                        className="text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                        <CiEdit size={20} />
                                    </button>
                                    <button
                                        onClick={(event) => { handleDelete(i, event) }}
                                        className="text-gray-500 hover:text-red-600 transition-colors"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableData