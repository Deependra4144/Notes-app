import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { handlePinn, movetoRecycleBin, undeletedNotes } from "../../assets/StorageData";
import { useEffect, useState } from "react";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TableData() {
    const [arr, setarr] = useState([])

    // console.log(arr)

    const handlepin = (i) => {
        let id = arr[i].Id
        handlePinn(id)
        setarr(undeletedNotes())
        if (arr[i].ispinned) {
            Swal.fire('Note is Unpinn')
        } else {
            Swal.fire('Note is pinned')
        }
    }

    let navigate = useNavigate()
    const handleEdit = (i) => {
        const noteToEdit = arr[i];
        navigate('/addnotes', { state: { note: noteToEdit, index: i } });
    }
    const handleDelete = (index) => {
        let updateNotes = [...arr];
        updateNotes[index].isDeleted = !updateNotes[index].isDeleted;
        movetoRecycleBin(updateNotes[index].Id);
        const farr = updateNotes.filter((_, i) => i !== index)
        setarr([...farr]);
        Swal.fire('Note is Delete')
    }

    useEffect(() => {
        let arr = undeletedNotes()
        setarr([...arr])
    }, [])
    return (
        <>
            <div className="container m-0 p-0">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Discription</th>
                            <th scope="col">Reminder</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Pin</th>
                            <th scope="col">Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map((note, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{note.task}</td>
                                    <td>{note.discription}</td>
                                    <td>{note.day}</td>
                                    <td>{note.priority}</td>
                                    <td>
                                        {note.ispinned ?
                                            <MdPushPin cursor={'pointer'} onClick={() => { handlepin(i) }} />
                                            :
                                            <MdOutlinePushPin cursor={'pointer'} onClick={() => { handlepin(i) }}

                                            />
                                        }
                                    </td>
                                    <td className="d-flex gap-2">
                                        <CiEdit fontSize={20} cursor={'pointer'} onClick={() => { handleEdit(i) }} />
                                        <AiOutlineDelete cursor={'pointer'} fontSize={20} onClick={() => { handleDelete(i) }} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableData