import { RiDeleteBin3Line } from "react-icons/ri";
import TableData from "./TableData";

function AllNotes() {
    let arr = JSON.parse(localStorage.getItem('Notes'));

    return (
        <div className="w-full">
            <h1 className="text-center text-2xl font-bold mb-4">All Notes</h1>
            <div className="flex justify-center items-center gap-3">
                {arr.length > 0 ? arr.map((v, i) => {
                    return (
                        <div className="shadow-md rounded-xl p-3 hover:shadow-lg transition-shadow duration-200" key={i}>
                            <h5 className="text-lg font-medium">{v.task}</h5>
                            <p className="text-gray-600 mt-1">{v.task}</p>
                            <button className="mt-2 p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100">
                                <RiDeleteBin3Line className="text-xl" />
                            </button>
                        </div>
                    )
                }) : <p className="text-yellow-500">Koi Note Nhi hai</p>}
            </div>
            <div className="mt-4">
                <TableData />
            </div>
        </div>
    )
}

export default AllNotes