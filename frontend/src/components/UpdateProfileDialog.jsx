import React, { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    })

    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)

        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                >

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                            <div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Update Profile
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    Update your profile information
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 rounded-xl hover:bg-white/5 transition"
                            >
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="overflow-y-auto px-6 py-5">

                            <form onSubmit={submitHandler}>

                                <div className="space-y-5">

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            name="fullname"
                                            value={input.fullname}
                                            onChange={changeEventHandler}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={input.email}
                                            onChange={changeEventHandler}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={input.phoneNumber}
                                            onChange={changeEventHandler}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition"
                                        />
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Bio
                                        </label>

                                        <textarea
                                            name="bio"
                                            value={input.bio}
                                            onChange={changeEventHandler}
                                            rows="4"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition resize-none"
                                        />
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Skills
                                        </label>

                                        <input
                                            type="text"
                                            name="skills"
                                            value={input.skills}
                                            onChange={changeEventHandler}
                                            placeholder="React, Node.js, MongoDB"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition"
                                        />
                                    </div>

                                    {/* Resume Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Resume (PDF only)
                                        </label>

                                        <input
                                            type="file"
                                            name="file"
                                            accept="application/pdf"
                                            onChange={fileChangeHandler}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 transition"
                                        />
                                    </div>
                                </div>

                                {/* Footer Button */}
                                <div className="mt-8">

                                    {loading ? (
                                        <button
                                            type="button"
                                            disabled
                                            className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium flex items-center justify-center"
                                        >
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-white font-medium transition"
                                        >
                                            Update Profile
                                        </motion.button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateProfileDialog