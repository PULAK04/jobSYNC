import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import Job from './Job'
import Navbar from './shared/Navbar'

const SavedJobs = () => {

    const navigate = useNavigate()

    const { savedJobs } = useSelector(
        store => store.savedJobs
    )

    const { user } = useSelector(
        store => store.auth
    )

    useEffect(() => {

        if (!user) {

            navigate("/login")
        }

    }, [user, navigate])

    if (!user) {

        return null
    }
    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300">

            <Navbar />

            <div className='min-h-screen bg-gray-900 px-6 py-10'>

                <div className='max-w-7xl mx-auto'>

                    <div className='flex items-center justify-between mb-10'>

                        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>

                            Saved Jobs

                        </h1>

                        

                    </div>

                    {
                        savedJobs.length === 0 ? (

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='text-gray-400 text-lg text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700'
                            >

                                No saved jobs yet.

                            </motion.div>

                        ) : (

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                                {
                                    savedJobs.map((job, index) => (

                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05
                                            }}
                                        >

                                            <Job
                                                job={job}
                                            />

                                        </motion.div>
                                    ))
                                }

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default SavedJobs