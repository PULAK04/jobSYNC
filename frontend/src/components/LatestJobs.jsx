import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-10"
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Latest & Top{' '}
                </span>
                <span className="text-gray-300">Job Openings</span>
            </motion.h1>

            {allJobs.length <= 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-16 bg-[#1f2937] rounded-xl border border-gray-700 text-gray-400"
                >
                    No Jobs Available
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {allJobs.slice(0, 6).map((job) => (
                        <motion.div
                            key={job._id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                        >
                            <LatestJobCards job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default LatestJobs;
