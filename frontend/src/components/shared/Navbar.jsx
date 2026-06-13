import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const Navbar = () => {

    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef();

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const logoutHandler = async () => {

        try {

            const res = await axios.get(
                `${USER_API_END_POINT}/logout`,
                { withCredentials: true }
            );

            if (res.data.success) {

                dispatch(setUser(null));

                navigate("/");

                toast.success(res.data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 z-50 relative'
        >

            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
                        Job
                        <span className='bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500'>
                            SYNC
                        </span>
                    </h1>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">

                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="text-gray-300"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </div>

                {/* Desktop Nav */}
                <div className='hidden md:flex items-center gap-12'>

                    <ul className='flex font-medium items-center gap-5'>

                        {user && user.role === 'recruiter' ? (

                            <>
                                <li>
                                    <Link
                                        to="/admin/companies"
                                        className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
                                    >
                                        Companies
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/admin/jobs"
                                        className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>

                        ) : (

                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/jobs"
                                        className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
                                    >
                                        Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/saved-jobs"
                                        className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
                                    >
                                        Saved Jobs
                                    </Link>
                                </li>

                                

                                <li>
                                    <Link
                                        to="/ai-history"
                                        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                                    >
                                        Match Reports
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Auth/Profile */}
                    {!user ? (

                        <div className='flex items-center gap-5'>

                            <Link to="/login">
                                <button className='px-6 py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md hover:opacity-90 transition'>
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className='px-6 py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md hover:opacity-90 transition'>
                                    Signup
                                </button>
                            </Link>

                        </div>

                    ) : (

                        <div className='relative' ref={dropdownRef}>

                            {/* Avatar */}
                            <motion.div
                                onClick={() => setDropdownOpen(prev => !prev)}
                                whileHover={{ scale: 1.03 }}
                                className='w-9 h-9 rounded-full overflow-hidden cursor-pointer border border-gray-600'
                            >

                                <img
                                    src={user?.profile?.profilePhoto}
                                    alt="Profile"
                                    className='w-full h-full object-cover'
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            </motion.div>

                            {/* Dropdown */}
                            <AnimatePresence>

                                {dropdownOpen && (

                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.18 }}
                                        className='absolute right-0 mt-3 w-80 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden'
                                    >

                                        <div className='p-5'>

                                            {/* User Info */}
                                            <div className='flex gap-4 items-start'>


                                                <div>
                                                    <h4 className='font-medium text-white'>
                                                        {user?.fullname}
                                                    </h4>

                                                    <p className='text-sm text-gray-400 line-clamp-2'>
                                                        {user?.profile?.bio}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className='mt-5 space-y-2'>

                                                {user?.role === 'student' && (

                                                    <Link
                                                        to="/profile"
                                                        className='flex items-center gap-3 text-gray-300 hover:text-purple-400 hover:bg-gray-700/60 transition px-3 py-2 rounded-xl'
                                                    >
                                                        <User2 className='w-4 h-4' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                )}

                                                <button
                                                    onClick={logoutHandler}
                                                    className='flex items-center gap-3 text-gray-300 hover:text-red-400 hover:bg-gray-700/60 transition px-3 py-2 rounded-xl w-full'
                                                >
                                                    <LogOut className='w-4 h-4' />
                                                    <span>Logout</span>
                                                </button>

                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>

                {menuOpen && (

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-gray-900 px-4 pb-4 pt-2 space-y-4 border-t border-gray-800"
                    >

                        <ul className="flex flex-col gap-3">

                            {(user?.role === 'recruiter'
                                ? [
                                    { to: "/admin/companies", label: "Companies" },
                                    { to: "/admin/jobs", label: "Jobs" }
                                ]
                                : [
                                    { to: "/", label: "Home" },
                                    { to: "/jobs", label: "Jobs" },
                                    { to:"/saved-jobs", label: "Saved Jobs" },
                                    { to:"/ai-history", label: "Match Reports" }
                                    
                                ]
                            ).map((item, idx) => (

                                <li key={idx}>

                                    <Link
                                        to={item.to}
                                        className="block text-gray-300 hover:text-orange-400 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>

                                </li>
                            ))}
                        </ul>

                        {!user ? (

                            <div className="flex flex-col gap-2">

                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <button className='w-full py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'>
                                        Login
                                    </button>
                                </Link>

                                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                    <button className='w-full py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'>
                                        Signup
                                    </button>
                                </Link>

                            </div>

                        ) : (

                            <div className="pt-2 space-y-3">

                                {user?.role === 'student' && (

                                    <Link
                                        to="/profile"
                                        className="block text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        View Profile
                                    </Link>
                                )}

                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        logoutHandler();
                                    }}
                                    className="block text-left text-red-400"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
