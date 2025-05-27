import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addNotes, editNotes } from "../assets/StorageData";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import '../styles/fonts.css';

function AddNote() {
    const { isDark } = useTheme();
    const [task, setTask] = useState("");
    const [discription, setDiscription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [selectedDate, setSelectedDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.note) {
            const { note } = location.state;
            setTask(note.task || "");
            setDiscription(note.discription || "");
            setPriority(note.priority || "Low");
            setSelectedDate(note.selectedDate || "");
        } else {
            // Set default date to today for new notes
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
        }
    }, [location]);

    const validateForm = () => {
        const newErrors = {};

        if (!task.trim()) {
            newErrors.task = "Title is required";
        } else if (task.trim().length < 3) {
            newErrors.task = "Title must be at least 3 characters";
        }

        if (!discription.trim()) {
            newErrors.discription = "Description is required";
        } else if (discription.trim().length < 10) {
            newErrors.discription = "Description must be at least 10 characters";
        }

        if (!selectedDate) {
            newErrors.selectedDate = "Please select a date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const now = new Date();
            const noteData = {
                task: task.trim(),
                discription: discription.trim(),
                priority,
                selectedDate: selectedDate,
                formattedSelectedDate: formatDateParts(selectedDate).date,
                createdAt: location.state?.note?.createdAt || now.toISOString(),
                lastModified: now.toISOString(),
                day: formatDateParts(now).date,
                ispinned: false,
                isDeleted: false,
                Id: location.state?.note?.Id || Date.now().toString(),
            };

            if (location.state?.note) {
                await editNotes(noteData);
                toast.success("Note updated successfully!");
            } else {
                await addNotes(noteData);
                toast.success("Note added successfully!");
            }

            navigate("/");
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error("Failed to save note. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2">
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {location.state?.note ? "Edit Note" : "Add New Note"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={task}
                                onChange={(e) => {
                                    setTask(e.target.value);
                                    if (errors.task) {
                                        setErrors({ ...errors, task: undefined });
                                    }
                                }}
                                className={`w-full px-4 py-2 rounded-lg border ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${errors.task
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'focus:border-blue-500 focus:ring-blue-500'
                                    } focus:outline-none focus:ring-1`}
                                placeholder="Enter note title"
                                disabled={isSubmitting}
                            />
                            {errors.task && (
                                <p className="mt-1 text-sm text-red-500">{errors.task}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={discription}
                                onChange={(e) => {
                                    setDiscription(e.target.value);
                                    if (errors.discription) {
                                        setErrors({ ...errors, discription: undefined });
                                    }
                                }}
                                rows="4"
                                className={`w-full px-4 py-2 rounded-lg border ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${errors.discription
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'focus:border-blue-500 focus:ring-blue-500'
                                    } focus:outline-none focus:ring-1`}
                                placeholder="Enter note description"
                                disabled={isSubmitting}
                            />
                            {errors.discription && (
                                <p className="mt-1 text-sm text-red-500">{errors.discription}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="date"
                                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        if (errors.selectedDate) {
                                            setErrors({ ...errors, selectedDate: undefined });
                                        }
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg border ${isDark
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                        } ${errors.selectedDate
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                            : 'focus:border-blue-500 focus:ring-blue-500'
                                        } focus:outline-none focus:ring-1`}
                                    min={new Date().toISOString().split('T')[0]}
                                    disabled={isSubmitting}
                                />
                                {errors.selectedDate && (
                                    <p className="mt-1 text-sm text-red-500">{errors.selectedDate}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="priority"
                                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${isDark
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                    disabled={isSubmitting}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {location.state?.note ? "Updating..." : "Adding..."}
                                    </span>
                                ) : (
                                    location.state?.note ? "Update Note" : "Add Note"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Preview
                    </h3>
                    <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div>
                            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Title</h4>
                            <p className="mt-1">{task || "Your note title will appear here"}</p>
                        </div>
                        <div>
                            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</h4>
                            <p className="mt-1">{discription || "Your note description will appear here"}</p>
                        </div>
                        <div>
                            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</h4>
                            {selectedDate ? (
                                <div className={`date-primary mt-2 inline-block ${isDark ? 'dark' : ''}`}>
                                    <span className="date-day">{formatDateParts(selectedDate).dayName}</span>
                                    <span className="date-numbers">{formatDateParts(selectedDate).date}</span>
                                </div>
                            ) : (
                                <p className="mt-2 text-gray-500">Select a date</p>
                            )}
                        </div>
                        <div>
                            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Priority</h4>
                            <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${priority === 'Low'
                                ? 'bg-green-100 text-green-700'
                                : priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                {priority}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddNote.propTypes = {
    isDark: PropTypes.bool,
};

export default AddNote;
