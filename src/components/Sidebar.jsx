import { useState } from "react";
import { NavLink } from "react-router-dom"
import { dt, time } from "../assets/Watch";
import QRCode from "react-qr-code";
function Rsidebar() {
    const [GetTime, setGetTime] = useState('')
    const [GetDate, setGetDate] = useState('')
    setTimeout(() => {
        setGetTime(time())
        setGetDate(dt())
    }, 1000);
    // console.log(GetDate)
    return (
        <div className="container-fluid bg-light p-3 h-100">
            <div className="row">
                <div className=" d-flex flex-column flex-shrink-0 p-3 bg-light">
                    <div className="d-flex flex-column gap-1">
                        <span className="fs-4">Notes</span>
                        <span className="text-danger" style={{ fontFamily: 'Orbitron , sans-serif' }}>{GetTime}</span>
                        <span className="text-danger" style={{ fontFamily: 'Orbitron , sans-serif' }}>{GetDate}</span>
                    </div>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="">
                            <NavLink to="/addnotes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                                AddNote
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link  active' : 'nav-link link-dark'}>
                                My Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/recyclebin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                                Recyclebin
                            </NavLink>
                        </li>
                        <li>
                            <QRCode className='position-relative bottom-0 qr my-md-5' bgColor='transparent' value='http://192.168.100.91:5174/' level='L' size={60} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Rsidebar