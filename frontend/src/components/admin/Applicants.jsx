import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { motion } from 'framer-motion'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                )
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.error('Error fetching applicants:', error)
            }
        }
        fetchAllApplicants()
    }, [params.id, dispatch])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-7xl mx-auto px-4 py-8'
            >
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transition-all">
                    <h1 className='text-2xl font-bold text-white mb-6'>
                        Applicants ({applicants?.applications?.length || 0})
                    </h1>
                    <ApplicantsTable />
                </div>
            </motion.div>
        </div>
    )
}

export default Applicants
