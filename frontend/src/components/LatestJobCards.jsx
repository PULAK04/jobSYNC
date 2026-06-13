import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-xl bg-gray-700 border border-gray-500 cursor-pointer hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-900/10 transition-all duration-300'
        >
            <div>
                <h1 className='font-medium text-lg text-gray-200'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-400'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-xl my-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-700'>
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-400 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-5'>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-blue-300 bg-blue-900/50'>
                    {job?.position} Positions
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-red-300 bg-red-900/50'>
                    {job?.jobType}
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-purple-300 bg-purple-900/50'>
                    {job?.salary}LPA
                </span>
            </div>
        </motion.div>
    )
}

export default LatestJobCards