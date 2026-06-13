import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {

    useGetAllJobs();

    const { allJobs } = useSelector(store => store.job);

    const dispatch = useDispatch();

    useEffect(() => {

        return () => {

            dispatch(setSearchedQuery(""));
        }

    }, [dispatch])

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300">

            <Navbar />

            <div className='max-w-7xl mx-auto px-4 py-10'>

                <div className='flex items-center justify-between mb-8'>

                    <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>

                        Search Results ({allJobs.length})

                    </h1>

                    

                </div>

                {allJobs.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center h-96 bg-gray-800/50 rounded-xl border border-gray-700 p-8"
                    >

                        <p className="text-gray-400 text-lg mb-4">

                            No jobs found matching your search criteria

                        </p>

                        <p className="text-gray-500 text-sm">

                            Try adjusting your search filters

                        </p>

                    </motion.div>

                ) : (

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                        {allJobs.map((job, index) => (

                            <motion.div
                                key={job?._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05
                                }}
                            >

                                <Job job={job} />

                            </motion.div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse