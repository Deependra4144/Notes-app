import { useLocation, useNavigate } from 'react-router-dom';
import icons from '../assets/Icons';
import './css/Addcss.css';
import { useEffect, useState } from 'react';
import { getId } from '../assets/Idgenrate';
import toast from 'react-hot-toast';

function AddNote() {
    const location = useLocation();
    const navigate = useNavigate();

    const [dataAry, setDataAry] = useState([]);
    const [data, setData] = useState({
        Id: getId(),
        isDeleted: false,
        task: '',
        discription: '',
        day: '',
        priority: 'Medium',
        ispinned: false,
    });

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('Notes')) || [];
        setDataAry(storedNotes);
        if (location.state && location.state.note) {
            setData(location.state.note);
        }
    }, [location.state]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.state && location.state.index >= 0) {
            const updatedNotes = [...dataAry];
            updatedNotes[location.state.index] = data;
            setDataAry(updatedNotes);
            localStorage.setItem('Notes', JSON.stringify(updatedNotes));
        } else {
            // If adding a new note
            setDataAry([...dataAry, data]);
            localStorage.setItem('Notes', JSON.stringify([...dataAry, data]));
            toast.success('Notes added successfully', {
                position: 'top-center',
            })
        }

        navigate('/');
    };

    return (
        <div className="container-fluid shadow rounded-5 pt-3" style={{ height: '97vh' }}>
            <div className='row border-bottom border-3  pb-4'>
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="ps-2 pe-5 d-flex flex-column gap-2">
                        <div>
                            <label htmlFor="tsk">Task</label>
                            <input type="text" id="tsk" value={data.task} name='task' placeholder='Enter Your Task' onChange={handlechange} />
                        </div>
                        <div>
                            <label htmlFor="dis">Discription</label>
                            <textarea name="discription" id="dis" onChange={handlechange} value={data.discription} style={{ width: '100%' }} className='ps-2 rounded' placeholder='enter task discription'></textarea>
                        </div>
                        <div>
                            <label htmlFor="dt">Date</label>
                            <input type="date" id="dt"
                                placeholder='dd-mm-yyyy'
                                name='day'
                                onChange={handlechange}
                                value={data.day}
                            />
                        </div>
                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select name="priority" id="priority" onChange={handlechange} value={data.priority}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Heigh">Heigh</option>
                            </select>
                        </div>
                        <div className="icons d-flex gap-2">
                            {icons.map((Icon, i) => (
                                <div key={i} className='btn btn-sm btn-outline-secondary'>
                                    <Icon size={16} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <input type="submit" value={"Submit"} className='btn btn-sm btn-outline-success' />
                        </div>
                    </form>
                </div>
                <div className="col-md-3">
                    <div className="shadow p-3 rounded-4 d-flex flex-column align-center" style={{ height: '100%' }}>
                        <p className='text-center fs-3 fw-5'>Example</p>
                        <p className='text-end'>{data.day}</p>
                        <h4>{data.task}</h4>
                        <p>{data.discription}</p>
                        <button className='btn btn-outline-secondary'>{data.priority}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNote;
