import { useState } from "react";
import { NavLink } from "react-router-dom"
import { dt, time } from "../assets/Watch";
import QRCode from "react-qr-code";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const [GetTime, setGetTime] = useState('')
    const [GetDate, setGetDate] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme();

    setTimeout(() => {
        setGetTime(time())
        setGetDate(dt())
    }, 1000);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Time Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Notes</span>
                            <div className="hidden sm:block">
                                <span className="text-red-500 font-['Orbitron'] text-sm">{GetTime}</span>
                                <span className="text-red-500 font-['Orbitron'] text-sm ml-2">{GetDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink
                            to="/addnotes"
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                    : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            Add Note
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                    : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            My Notes
                        </NavLink>
                        <NavLink
                            to="/recyclebin"
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                    : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            Recycle Bin
                        </NavLink>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark
                                ? 'text-yellow-500 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
                        </button>
                        <div className="ml-4">
                            <QRCode
                                className="w-8 h-8"
                                bgColor={isDark ? "#1f2937" : "transparent"}
                                fgColor={isDark ? "#ffffff" : "#000000"}
                                value="http://192.168.100.91:5174/"
                                level="L"
                                size={32}
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark
                                ? 'text-yellow-500 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {isDark ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {isMenuOpen ? <IoClose size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2">
                            <NavLink
                                to="/addnotes"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                        : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }
                                onClick={toggleMenu}
                            >
                                Add Note
                            </NavLink>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                        : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }
                                onClick={toggleMenu}
                            >
                                My Notes
                            </NavLink>
                            <NavLink
                                to="/recyclebin"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'px-3 py-2 rounded-md bg-blue-600 text-white'
                                        : `px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }
                                onClick={toggleMenu}
                            >
                                Recycle Bin
                            </NavLink>
                            <div className="px-3 py-2">
                                <span className="text-red-500 font-['Orbitron'] text-sm block">{GetTime}</span>
                                <span className="text-red-500 font-['Orbitron'] text-sm block">{GetDate}</span>
                            </div>
                            <div className="px-3">
                                <QRCode
                                    className="w-16 h-16"
                                    bgColor={isDark ? "#1f2937" : "transparent"}
                                    fgColor={isDark ? "#ffffff" : "#000000"}
                                    value="http://192.168.100.91:5174/"
                                    level="L"
                                    size={64}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar