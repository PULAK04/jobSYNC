import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-10'>

        {/* Filter & Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col md:flex-row items-center justify-between gap-4 mb-8'
        >
          <motion.input
            type="text"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full md:w-64 px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md hover:from-blue-700 hover:to-orange-700 transition-all duration-300 shadow-md"
          >
            Create New Job
          </motion.button>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  )
}

export default AdminJobs
