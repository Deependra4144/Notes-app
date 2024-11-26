import { RiDeleteBin3Line } from "react-icons/ri";
import TableData from "./TableData";
function AllNotes() {
    let arr = JSON.parse(localStorage.getItem('Notes'));
    return (
        <>
            <h1 className="text-center">All Notes</h1>
            <div className="d-flex justify-content-center align-center gap-3">

                {arr.length > 0 ? arr.map((v, i) => {
                    return (
                        <div className="shadow p-3" key={i}>
                            <h5>{v.task}</h5>
                            <p>{v.task}</p>
                            <button><RiDeleteBin3Line /></button>
                        </div>
                    )
                }) : <p className="text-warning">Koi Note Nhi hai</p>}
            </div>
            <TableData />
        </>
    )
}

export default AllNotes