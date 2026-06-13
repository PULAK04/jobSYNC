import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Filter Sidebar */}
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>

                    {/* Job Listings */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center h-96 bg-gray-800/50 rounded-xl border border-gray-700 p-8"
                            >
                                <p className="text-gray-400 text-lg mb-4">No jobs found matching your criteria</p>
                                <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
                            </motion.div>
                        ) : (
                            <div className='h-[calc(100vh-200px)] lg:h-[85vh] overflow-y-auto pr-2 custom-scrollbar'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                    {filterJobs.map((job, index) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs