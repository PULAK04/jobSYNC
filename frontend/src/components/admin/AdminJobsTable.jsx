import React, { useEffect, useState } from 'react'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()
    const [openPopoverId, setOpenPopoverId] = useState(null)

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    const togglePopover = (id) => {
        setOpenPopoverId(openPopoverId === id ? null : id)
    }

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 text-sm text-gray-400">
                A list of your recent posted jobs
            </div>
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Company Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {filterJobs?.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-800 transition-all duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                {job?.company?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {job?.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {job?.createdAt?.split("T")[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative inline-block text-left">
                                    <button
                                        type="button"
                                        onClick={() => togglePopover(job._id)}
                                        className="inline-flex justify-center items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
                                    >
                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </button>

                                    <AnimatePresence>
                                        {openPopoverId === job._id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-xl bg-gray-800 ring-1 ring-black ring-opacity-40 z-10"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/companies/${job._id}`)
                                                            setOpenPopoverId(null)
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left transition-colors"
                                                    >
                                                        <Edit2 className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/jobs/${job._id}/applicants`)
                                                            setOpenPopoverId(null)
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left transition-colors"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Applicants
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable
