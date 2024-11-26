import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { handlePinn, movetoRecycleBin, undeletedNotes } from "../../assets/StorageData";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import Swal from "sweetalert2"
import DetailedNote from "../../assets/DetailedNote";
function CardsData() {
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
        // event.stopPropagation()
        event.stopPropagation();
        let updatedNotes = [...showNotes];
        updatedNotes[index].ispinned = !updatedNotes[index].ispinned;
        handlePinn(updatedNotes[index].Id);

        setshowNotes(updatedNotes);
    }

    const handleDetails = (i) => {
        let obj = showNotes[i];
        // console.log(obj)

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

    return (
        <div className="container-fluid p-0 m-0">
            <div className="row gap-3 justify-content-center p-0" >
                {showNotes.length > 0 ? showNotes.map((note, i) => {
                    return (
                        <div key={note.Id} onClick={() => { handleDetails(i) }} className="col-md-3 rounded-3 shadow p-4" >
                            {note.ispinned ?
                                <MdPushPin cursor={'pointer'} onClick={(event) => { setpin(i, event) }} />
                                :
                                <MdOutlinePushPin cursor={'pointer'} onClick={(event) => { setpin(i, event) }}

                                />
                            }
                            <h5>{note.task.length > 18 ? note.task.slice(0, 18) + '....' : note.task}</h5>
                            <p>{note.discription.length > 18 ? note.discription.slice(0, 20) + '...' : note.discription}</p>
                            <div className="d-flex flex-wrap justify-content-between">
                                <button className="btn py-0 btn-sm btn-outline-dark" disabled>{note.priority}</button>
                                <p className="fw-bold">{note.day}</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="btn btn-sm fs-5">
                                    <CiEdit onClick={(event) => { handleEdit(i, event) }} />
                                </div>
                                <div cursor='pointer' className="btn btn-sm fs-5">
                                    <AiOutlineDelete onClick={(event) => { handleDelete(i, event) }} />
                                </div>
                            </div>
                        </div>
                    )
                }) : <p className="text-danger">Koi Note Nhi Hai</p>}
            </div >
        </div>
    )
}

export default CardsData