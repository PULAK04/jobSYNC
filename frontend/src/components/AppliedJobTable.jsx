import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
            <table className="w-full border-collapse bg-gray-800">
                <caption className="text-sm text-gray-400 mb-4 p-4 bg-gray-900 rounded-t-lg">
                    A list of your applied jobs
                </caption>
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Date</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Job Role</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Company</th>
                        <th className="text-right py-4 px-6 font-medium text-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.length <= 0 ? (
                        <tr>
                            <td colSpan="4" className="py-8 text-center text-gray-500 bg-gray-800">
                                You haven't applied to any jobs yet.
                            </td>
                        </tr>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <tr 
                                key={appliedJob._id} 
                                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                            >
                                <td className="py-4 px-6 text-gray-300">{appliedJob?.createdAt?.split("T")[0]}</td>
                                <td className="py-4 px-6 text-gray-200 font-medium">{appliedJob.job?.title}</td>
                                <td className="py-4 px-6 text-gray-400">{appliedJob.job?.company?.name}</td>
                                <td className="py-4 px-6 text-right">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        appliedJob?.status === "rejected" ? 'bg-red-500/90 text-white' : 
                                        appliedJob.status === 'pending' ? 'bg-yellow-500/90 text-gray-900' : 
                                        'bg-green-500/90 text-white'
                                    }`}>
                                        {appliedJob.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable;