import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const Profile = () => {
    useGetAppliedJobs()

    const [open, setOpen] = useState(false)

    const { user } = useSelector(store => store.auth)

    const isResume = Boolean(user?.profile?.resume)

    const downloadResume = async () => {
        const response = await fetch(user.profile.resume)
        const blob = await response.blob()

        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = "resume.pdf"

        document.body.appendChild(link)
        link.click()

        link.remove()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] min-h-screen w-screen overflow-x-hidden text-white">
            <Navbar />

            {/* Main Profile Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#111827]/90 border border-white/10 rounded-3xl my-6 mx-auto p-6 md:p-8 max-w-6xl backdrop-blur-xl"
            >

                {/* Header */}
                <div className='flex flex-col md:flex-row justify-between gap-6 mb-10'>

                    <div className='flex items-center gap-9'>

                        {/* Profile Image */}
                        <div className="h-24 w-24 rounded-2xl overflow-hidden border border-white/10 shadow-md position-absolute">
                            <img
                                src={
                                    user?.profile?.avatar ||
                                    user?.profile?.profilePhoto ||
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div>
                            <h1 className='font-bold text-3xl text-white'>
                                {user?.fullname}
                            </h1>

                            <p className="text-gray-400 max-w-[700px] mt-2 leading-normal">
                                {user?.profile?.bio || "No bio available"}
                            </p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <motion.button
                        onClick={() => setOpen(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="self-start md:self-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                        <Pen className="h-5 w-5 text-gray-300" />
                    </motion.button>
                </div>

                {/* Contact Info */}
                <div className='space-y-4 mb-10'>

                    <div className='flex items-center gap-3 text-gray-300 bg-white/5 border border-white/5 rounded-xl p-4'>
                        <div className="p-2 rounded-lg bg-white/5">
                            <Mail className="h-5 w-5 text-blue-300" />
                        </div>

                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 text-gray-300 bg-white/5 border border-white/5 rounded-xl p-4'>
                        <div className="p-2 rounded-lg bg-white/5">
                            <Contact className="h-5 w-5 text-blue-300" />
                        </div>

                        <span>{user?.phoneNumber || "Not provided"}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='mb-10'>

                    <h2 className="text-xl font-semibold text-white mb-5">
                        Skills
                    </h2>

                    <div className='flex flex-wrap gap-3'>

                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (

                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm bg-white/5 text-gray-300 border border-white/10"
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500">
                                No skills added
                            </span>
                        )}
                    </div>
                </div>

                {/* Resume */}
                <div className='mb-2'>

                    <h2 className="text-xl font-semibold text-white mb-5">
                        Resume
                    </h2>

                    {isResume ? (

                        <div className="flex items-center justify-between bg-[#0f172a]/80 border border-white/10 rounded-2xl px-5 py-4 hover:border-white/20 transition">

                            {/* Left */}
                            <div className="flex items-center gap-4 overflow-hidden">

                                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                                    📄
                                </div>

                                <div className="overflow-hidden">

                                    <p className="text-white font-medium truncate">
                                        {user.profile.resumeOriginalName || "resume.pdf"}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Uploaded Resume
                                    </p>
                                </div>
                            </div>

                            {/* Download Button */}
                            <motion.button
                                onClick={downloadResume}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-xl bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16"
                                    />
                                </svg>
                            </motion.button>
                        </div>

                    ) : (
                        <span className="text-gray-500">
                            No resume uploaded
                        </span>
                    )}
                </div>
            </motion.div>

            {/* Applied Jobs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='w-full bg-[#111827]/90 border border-white/10 rounded-3xl mx-auto p-6 md:p-8 mb-8 max-w-6xl backdrop-blur-xl'
            >

                <h1 className='font-bold text-3xl mb-8 text-white'>
                    Applied Jobs
                </h1>

                <AppliedJobTable />
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile