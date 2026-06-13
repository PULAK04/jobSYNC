import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        setLoading(true);
        try {
             //dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    if (user) {
        navigate("/");
    }
}, [user, navigate]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center transition-colors duration-300">
            <div className="w-full fixed top-0 left-0 z-50">
              
            </div>
            <div className="flex items-center justify-center w-full h-full pt-20">
                <form onSubmit={submitHandler} className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-2xl p-8 my-10 shadow-2xl" style={{ boxShadow: '0 8px 32px 0 rgba(60, 0, 120, 0.25)' }}>
                    <h1 className="font-bold text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sign Up</h1>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <label className="block text-sm font-medium text-gray-300">Role</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 accent-purple-500"
                                />
                                <label htmlFor="student" className="text-sm text-gray-300">Student</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 accent-purple-500"
                                />
                                <label htmlFor="recruiter" className="text-sm text-gray-300">Recruiter</label>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-300">Profile</label>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 bg-gray-900 border border-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin text-purple-200' />
                                Please wait
                            </span>
                        ) : 'Sign Up'}
                    </button>

                    <p className="text-sm text-center mt-6 text-gray-400">
                        Already have an account?
                        <Link to="/login" className="text-blue-400 hover:text-orange-400 ml-1 transition-colors">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup