import { useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"
import { MdOutlinePushPin, MdPushPin } from "react-icons/md"
import { handlePinn, movetoRecycleBin, pinnNotesData } from "../../assets/StorageData"
import { useNavigate } from "react-router-dom"

function PinData() {
    const navigate = useNavigate()
    let arr = pinnNotesData()
    const [pinNotes, setpinNotes] = useState([...arr])
    const handlepin = (i) => {
        let id = arr[i].Id
        handlePinn(id)
        setpinNotes(pinnNotesData)

    }
    const handleEdit = (i) => {
        const noteToEdit = pinNotes[i];
        navigate('/addnotes', { state: { note: noteToEdit, index: i } });
    };
    const handleDelete = (index) => {
        let updateNotes = [...pinNotes];
        updateNotes[index].isDeleted = !updateNotes[index].isDeleted;
        movetoRecycleBin(updateNotes[index].Id);
        const arr = updateNotes.filter((_, i) => i !== index)
        setpinNotes([...arr]);
    }

    return (
        <>
            {pinNotes.length > 0 ? pinNotes.map((note, i) => {
                return (
                    <div key={i} className="col-md-3 rounded shadow p-3" >
                        {note.ispinned ?
                            <MdPushPin cursor={'pointer'} onClick={() => { handlepin(i) }} />
                            :
                            <MdOutlinePushPin cursor={'pointer'} onClick={() => { handlepin(i) }}

                            />
                        }
                        <h5>{note.task}</h5>
                        <p>{note.discription}</p>
                        <div className="d-flex flex-wrap justify-content-between">
                            <button className="btn py-0 btn-sm btn-outline-dark" disabled>{note.priority}</button>
                            <p className="fw-bold">{note.day}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="btn btn-sm fs-5">
                                <CiEdit onClick={() => { handleEdit(i) }} />
                            </div>
                            <div cursor='pointer' className="btn btn-sm fs-5">
                                <AiOutlineDelete onClick={() => { handleDelete(i) }} />
                            </div>
                        </div>
                    </div>
                )
            }) : <p className="text-danger">Koi Note Nhi Hai</p>}
        </>
    )
}

export default PinData