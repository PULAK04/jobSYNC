import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    // Reduced subtle animations
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }

    return (
        <div className='text-center bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 overflow-hidden relative'>

            {/* Softer background blur elements */}
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-500/5 blur-3xl" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className='flex flex-col gap-6 my-10 max-w-6xl mx-auto'
            >

                <motion.div variants={item}>
                    <h1 className='text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 leading-tight'>
                        Land Your Dream Job With AI Precision <br />

                        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
                            Fast, Easy & Hassle-Free
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    variants={item}
                    className='text-gray-400 max-w-2xl mx-auto px-4 text-lg leading-relaxed'
                >
                    AI-powered job matching, skill gap analysis, ATS resume optimization, interview preparation, and personalized career guidance — all in one intelligent platform.
                </motion.p>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className='flex w-full md:w-[50%] bg-gray-800 border border-gray-700 hover:border-purple-500/20 pl-3 rounded-full items-center gap-4 mx-auto transition-all duration-300 shadow-lg'
                >

                    <input
                        type="text"
                        placeholder='Find your dream jobs...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-4 px-5 rounded-l-full bg-transparent text-gray-200 placeholder-gray-400'
                        value={query}
                    />

                    <motion.button
                        onClick={searchJobHandler}
                        className="rounded-r-full  text-white p-4 transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Search className='h-5 w-7' />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection