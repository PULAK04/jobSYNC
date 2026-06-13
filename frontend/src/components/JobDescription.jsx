import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { generateInterviewReport } from '../interview/services/interview.api'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import { useInterview } from '../interview/hooks/useInterview'
import { motion } from 'framer-motion'

const JobDescription = () => {

    const { singleJob } = useSelector(store => store.job)

    const { user } = useSelector(store => store.auth)

    const isInitiallyApplied =
        singleJob?.applications?.some(
            application => application.applicant === user?._id
        ) || false

    const [isApplied, setIsApplied] =
        useState(isInitiallyApplied)

    const [aiLoading, setAiLoading] =
        useState(false)

    const params = useParams()

    const jobId = params.id

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { loading } = useInterview()



    const handleAiMatch = async () => {


        if (!user) {

            navigate("/login");

            return;
        }

        try {

            setAiLoading(true)



            const data = await generateInterviewReport({

                jobTitle: singleJob?.title,

                selfDescription: user?.profile?.bio,

                jobDescription: singleJob?.description,

                resumeUrl: user?.profile?.resume
            })

            console.log(data)

            if (data?.interviewReport?._id) {

                navigate(`/ai-report/${data.interviewReport._id}`)
            }

        } catch (error) {

            console.log(error)



            if (!user?.profile?.resume) {
                toast.error("Please upload your resume and complete your profile bio to access AI Match.")
            } else {
                toast.error(
                    error?.response?.data?.message ||
                    "The AI service is currently experiencing high demand. Please try again in a few moments."
                )
            }

        } finally {

            setAiLoading(false)
        }
    }



    const applyJobHandler = async () => {


        if (!user) {

            navigate("/login");

            return;
        }

        try {

            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {

                setIsApplied(true)

                const updatedSingleJob = {

                    ...singleJob,

                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                }

                dispatch(setSingleJob(updatedSingleJob))

                toast.success(res.data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to apply'
            )
        }
    }



    useEffect(() => {

        const fetchSingleJob = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    {
                        withCredentials: true
                    }
                )

                if (res.data.success) {

                    dispatch(setSingleJob(res.data.job))

                    setIsApplied(
                        res.data.job.applications.some(
                            application =>
                                application.applicant === user?._id
                        )
                    )
                }

            } catch (error) {

                console.log(error)
            }
        }

        fetchSingleJob()

    }, [jobId, dispatch, user?._id])



    // AI LOADING SCREEN

   if (aiLoading) {

    return (

        <div className="fixed inset-0 z-[9999] bg-[#111827] flex flex-col items-center justify-center">

            <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

            <p className="mt-5 text-gray-400 text-lg">
                Please wait a few seconds while we generate your AI Match Report...
            </p>

        </div>
    )
}







    return (

        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300'>

            <Navbar />

            <div className='min-h-screen bg-gray-900 text-gray-100 py-10 px-4'>

                <div className='max-w-7xl mx-auto'>

                    {/* Header */}
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md'>

                        <div>

                            <h1 className='font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400'>

                                {singleJob?.title}

                            </h1>

                            <div className='flex flex-wrap items-center gap-2 mt-4'>

                                <span className='px-3 py-1 rounded-full text-xs font-semibold text-blue-300 bg-blue-800/50'>
                                    {singleJob?.position} Positions
                                </span>

                                <span className='px-3 py-1 rounded-full text-xs font-semibold text-red-300 bg-red-800/50'>
                                    {singleJob?.jobType}
                                </span>

                                <span className='px-3 py-1 rounded-full text-xs font-semibold text-purple-300 bg-purple-800/50'>
                                    {singleJob?.salary} LPA
                                </span>

                            </div>

                        </div>

                        <div className='flex items-center gap-5'>

                            {/* AI Match Button */}
                            <button
                                onClick={handleAiMatch}
                                className='px-4 py-3 bg-gradient-to-r from-purple-800 to-blue-800 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2'
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                >
                                    <path d="M12 2C10.8 6.8 8.8 8.8 4 10c4.8 1.2 6.8 3.2 8 8 1.2-4.8 3.2-6.8 8-8-4.8-1.2-6.8-3.2-8-8z" />
                                    <path d="M18.5 16.5C18 18.5 17 19.5 15 20c2 .5 3 1.5 3.5 3 .5-1.5 1.5-2.5 3.5-3-2-.5-3-1.5-3.5-3.5z" />
                                </svg>

                                AI Match

                            </button>

                            {/* Apply Button */}
                            <button
                                onClick={
                                    isApplied
                                        ? null
                                        : applyJobHandler
                                }

                                disabled={isApplied}

                                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${isApplied
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-800 to-blue-800 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/30'
                                    }`}
                            >

                                {
                                    isApplied
                                        ? 'Already Applied'
                                        : 'Apply Now'
                                }

                            </button>

                        </div>

                    </div>

                    {/* Description */}
                    <h2 className='border-b border-gray-700 font-semibold text-lg mt-10 mb-6 text-gray-300'>
                        Job Description
                    </h2>

                    <div className='bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4'>

                        <InfoRow
                            label="Role"
                            value={singleJob?.title}
                        />

                        <InfoRow
                            label="Location"
                            value={singleJob?.location}
                        />

                        <InfoRow
                            label="Description"
                            value={singleJob?.description}
                        />
                       <div className='flex flex-col sm:flex-row'>

    <h3 className='min-w-[140px] font-semibold text-gray-400'>
        Requirements:
    </h3>

    <div className='flex flex-wrap gap-2'>

        {
            singleJob?.requirements?.map((skill, index) => (

                <span
                    key={index}
                    className='px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 hover:border-purple-400 hover:text-purple-300 transition-all duration-300'
                >
                    {skill}
                </span>

            ))
        }

    </div>

</div>

                        <InfoRow
                            label="Experience"
                            value={`${singleJob?.experienceLevel} yrs`}
                        />

                        <InfoRow
                            label="Salary"
                            value={`${singleJob?.salary} LPA`}
                        />

                        <InfoRow
                            label="Total Applicants"
                            value={singleJob?.applications?.length}
                        />

                        <InfoRow
                            label="Posted Date"
                            value={singleJob?.createdAt?.split("T")[0]}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}



const InfoRow = ({ label, value }) => (

    <div className='flex flex-col sm:flex-row'>

        <h3 className='min-w-[140px] font-semibold text-gray-400'>
            {label}:
        </h3>

        <span className='text-gray-200'>
            {value || '-'}
        </span>

    </div>
)

export default JobDescription