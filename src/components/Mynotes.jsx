import { CiViewTable } from "react-icons/ci";
import { IoIosChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";
import CardsData from "./NoteData/CardsData";
import TableData from "./NoteData/TableData";
import { useState } from "react";
import PinData from "./NoteData/PinData";
function Mynotes() {
    const [View, setView] = useState(<CardsData />)
    const handleTableview = () => {
        setView(<TableData />)
    }


    const handlePin = () => {
        setView(<PinData />)

    }
    const handleAllNote = () => {
        setView(<CardsData />)
    }
    return (
        <div className="container">

            <Link to="/addnotes">
                <button className="btn btn-sm btn-outline-secondary form-control mt-2 text-start">New Note Bnavo</button>
            </Link>

            <div className="my-2 d-flex align-center justify-content-between" style={{ height: '35px' }}>
                <div className="d-flex gap-3">
                    <button onClick={handleAllNote} className="btn btn-sm btn-outline-info">All Notes</button>
                    <button className="btn btn-sm btn-outline-success" onClick={handlePin}>Pinned Notes</button>
                </div>
                <div className="d-flex gap-3 pe-3">
                    <button onClick={handleTableview} className="btn btn-sm btn-outline-secondary "><CiViewTable /></button>

                    <button className="btn btn-sm btn-outline-secondary" onClick={handleAllNote}><IoIosChatboxes /></button>
                </div>
            </div>
            {View}
        </div>
    )
}

export default Mynotes