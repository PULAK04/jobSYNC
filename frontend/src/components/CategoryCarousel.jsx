import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.06,
            duration: 0.3,
            ease: 'easeOut'
        }
    })
};

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-4xl mx-auto my-20"
        >

            <div className="flex overflow-x-auto scrollbar-hide space-x-4 px-4 py-4">

                {category.map((cat, index) => (

                    <motion.button
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                        whileHover={{
                            scale: 1.03,
                            borderColor: '#6366f1',
                            color: '#fff'
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700 text-gray-300 transition-all duration-200 shadow-md"
                        onClick={() => searchJobHandler(cat)}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            
        </motion.div>
    );
};

export default CategoryCarousel;