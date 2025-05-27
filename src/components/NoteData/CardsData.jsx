import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { handlePinn, movetoRecycleBin, undeletedNotes } from "../../assets/StorageData";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import Swal from "sweetalert2"
import DetailedNote from "../../assets/DetailedNote";
import { useTheme } from "../../context/ThemeContext";
import '../../styles/fonts.css';

function CardsData() {
    const [showNotes, setshowNotes] = useState([]);
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const formatDateParts = (date) => {
        const d = new Date(date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const dayName = days[d.getDay()];
        return {
            dayName,
            date: `${day}/${month}/${year}`
        };
    };

    const handleDelete = (index, event) => {
        event.stopPropagation();
        let updateNotes = [...showNotes];
        updateNotes[index].isDeleted = !updateNotes[index].isDeleted;
        movetoRecycleBin(updateNotes[index].Id);
        const arr = updateNotes.filter((_, i) => i !== index)
        setshowNotes([...arr]);
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
            <div className="shadow-lg rounded-xl p-4 flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Notes Yet</h3>
                <p className="text-gray-600">Create your first note to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {showNotes.map((note, i) => (
                <div
                    key={note.Id}
                    onClick={() => { handleDetails(i) }}
                    className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${isDark ? 'bg-gray-800 hover:shadow-blue-500/20' : 'hover:shadow-blue-500/10'
                        }`}
                >
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-4">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className={`text-lg font-medium line-clamp-1 group-hover:line-clamp-none transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                {note.task}
                            </h3>
                            <button
                                onClick={(event) => { setpin(i, event) }}
                                className={`transform transition-transform duration-300 p-1.5 rounded-full -mt-1 -mr-1 ${note.ispinned
                                    ? isDark
                                        ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/20'
                                        : 'text-blue-600 hover:text-blue-500 hover:bg-blue-50'
                                    : isDark
                                        ? 'text-gray-400 hover:text-blue-300 hover:bg-blue-500/20'
                                        : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                    } group-hover:scale-110`}
                            >
                                {note.ispinned ? <MdPushPin size={20} /> : <MdOutlinePushPin size={20} />}
                            </button>
                        </div>

                        <p className={`text-sm line-clamp-2 group-hover:line-clamp-none mb-4 transition-all duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            {note.discription}
                        </p>

                        <div className={`flex items-center justify-between`}>
                            <span className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${note.priority === 'Low'
                                ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                                : note.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200'
                                    : 'bg-red-100 text-red-700 group-hover:bg-red-200'
                                }`}>
                                {note.priority}
                            </span>
                            <div className="flex flex-col items-end">
                                <div className="date-display">
                                    <div className={`date-primary ${isDark ? 'dark' : ''}`}>
                                        <span className="date-day">{formatDateParts(note.selectedDate).dayName}</span>

                                    </div>
                                    <div className={`date-secondary ${isDark ? 'dark' : ''}`}>
                                        {formatDateParts(note.createdAt).date}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Hidden by default, shown on hover */}
                        <div className={`flex justify-end gap-1 mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'
                            }`}>
                            <button
                                onClick={(event) => { handleEdit(i, event) }}
                                className={`p-2 rounded-full transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${isDark
                                    ? 'text-gray-400 hover:text-blue-300 hover:bg-blue-500/20'
                                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                title="Edit Note"
                            >
                                <CiEdit size={20} />
                            </button>
                            <button
                                onClick={(event) => { handleDelete(i, event) }}
                                className={`p-2 rounded-full transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${isDark
                                    ? 'text-gray-400 hover:text-red-300 hover:bg-red-500/20'
                                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                                    }`}
                                title="Delete Note"
                            >
                                <AiOutlineDelete size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardsData