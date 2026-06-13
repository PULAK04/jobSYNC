import React, { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const [openPopoverId, setOpenPopoverId] = useState(null)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Status update failed")
        } finally {
            setOpenPopoverId(null)
        }
    }

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 text-sm text-gray-400">
                A list of your recent applicants
            </div>
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Resume</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {applicants?.applications?.length > 0 ? (
                        applicants.applications.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-800 transition-all duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item?.applicant?.fullname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item?.applicant?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item?.applicant?.phoneNumber || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            href={item.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline hover:text-purple-400 transition-colors"
                                        >
                                            {item.applicant.profile.resumeOriginalName || "View Resume"}
                                        </a>
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {item?.applicant?.createdAt?.split("T")[0]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative inline-block text-left">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenPopoverId(openPopoverId === item._id ? null : item._id)
                                            }
                                            className="inline-flex justify-center items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
                                        >
                                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                        </button>

                                        <AnimatePresence>
                                            {openPopoverId === item._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-xl bg-gray-800 ring-1 ring-black ring-opacity-40 z-10"
                                                >
                                                    <div className="py-1">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => statusHandler(status, item._id)}
                                                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left transition-colors"
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                No applicants found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ApplicantsTable
