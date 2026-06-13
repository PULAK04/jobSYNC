import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
    }, [user, navigate])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center transition-colors duration-300">
            <div className="w-full fixed top-0 left-0 z-50">
               
            </div>
            <div className="flex items-center justify-center w-full h-full pt-20">
                <form
                    onSubmit={submitHandler}
                    className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-2xl p-8 my-10 shadow-2xl animate-fade-in"
                    style={{ boxShadow: "0 8px 32px 0 rgba(60, 0, 120, 0.25)" }}
                >
                    <h1 className="font-bold text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 animate-slide-down">Login</h1>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@email.com"
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center animate-pulse">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin text-purple-200' />
                                Please wait
                            </span>
                        ) : 'Login'}
                    </button>

                    <p className="text-sm text-center mt-6 text-gray-400">
                        Don't have an account?
                        <Link to="/signup" className="text-blue-400 hover:text-orange-400 ml-1 transition-colors">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login