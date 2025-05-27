import { CiViewTable } from "react-icons/ci";
import { IoIosChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";
import CardsData from "./NoteData/CardsData";
import TableData from "./NoteData/TableData";
import { useState } from "react";
import PinData from "./NoteData/PinData";
import { IoAddOutline } from "react-icons/io5";

function Mynotes() {
    const [View, setView] = useState(<CardsData />)
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'pinned'
    const [viewMode, setViewMode] = useState('cards'); // 'cards', 'table'

    const handleTableview = () => {
        setView(<TableData />)
        setViewMode('table')
    }

    const handlePin = () => {
        setView(<PinData />)
        setActiveTab('pinned')
    }

    const handleAllNote = () => {
        setView(<CardsData />)
        setActiveTab('all')
        setViewMode('cards')
    }

    return (
        <div className="space-y-6">


            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white p-4 rounded-xl shadow-sm">
                {/* View Filters */}
                <div className="flex gap-3 order-2 sm:order-1">
                    <button
                        onClick={handleAllNote}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Notes
                    </button>
                    <button
                        onClick={handlePin}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'pinned'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Pinned Notes
                    </button>
                </div>

                {/* View Toggle */}
                <div className="flex gap-2 order-1 sm:order-2 sm:ml-auto">
                    <button
                        onClick={handleTableview}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'table'
                            ? 'bg-gray-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        title="Table View"
                    >
                        <CiViewTable size={24} />
                    </button>
                    <button
                        onClick={handleAllNote}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'cards'
                            ? 'bg-gray-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        title="Card View"
                    >
                        <IoIosChatboxes size={24} />
                    </button>
                </div>
            </div>

            {/* Notes Content */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                {View}
            </div>
        </div>
    )
}

export default Mynotes