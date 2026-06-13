import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.jsx'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar.jsx'




const NAV_ITEMS = [
    {
        id: 'technical',
        label: 'Technical Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: 'behavioral',
        label: 'Behavioral Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: 'roadmap',
        label: 'Road Map',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        )
    },
]

const QuestionCard = ({ item, index }) => {

    return (


        <div className="bg-[#28303b] border border-gray-600/60 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300">

            <div className="flex items-start gap-4">

                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white  flex-shrink-0">
                    {index + 1}
                </div>

                <p className="text-gray-200 leading-8 text-[15px]">
                    {item}
                </p>
            </div>
        </div>
    )
}

const RoadMapDay = ({ day, index }) => (

    <div className="bg-[#28303b] border border-gray-600/60 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">

        <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                {index + 1}
            </div>

            <h3 className="text-lg font-semibold text-white">
                Day {index + 1}
            </h3>
        </div>

        <p className="text-gray-300 leading-8 text-[15px]">
            {day}
        </p>
    </div>
)

const Interview = () => {


    const [activeNav, setActiveNav] = useState('technical')

    const {
        report,
        getReportById,
        loading,
        getResumePdf
    } = useInterview()

    const { interviewId } = useParams()

    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId)
        }

    }, [interviewId])

    if (loading || !report) {

        return (

            <div className="fixed inset-0 z-[9999] bg-[#111827] flex flex-col items-center justify-center">

                <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

                <p className="mt-5 text-gray-400 text-lg">
                    Please wait a few seconds...
                </p>

            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300'>        <Navbar />


            <div className="w-full min-h-screen bg-[#151e2c] px-6 py-10">


                <div className="max-w-[1450px] mx-auto">

                    {/* Header */}
                    <div className="mb-10">

                        <h1 className="text-4xl font-bold text-white leading-tight">

                            AI <span className="text-purple-500">&</span> Interview Report

                        </h1>

                        <p className="text-gray-400 mt-4 text-lg">
                            Personalized interview preparation roadmap based on your resume and target role.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6">

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-3">

                            <div className="bg-[#28303b] border border-gray-600/60 rounded-3xl p-6 sticky top-6">

                                <h2 className="text-white font-semibold text-xl mb-6">
                                    Sections
                                </h2>

                                <div className="space-y-3">

                                    {NAV_ITEMS.map(item => (

                                        <button
                                            key={item.id}
                                            onClick={() => setActiveNav(item.id)}
                                            className={`
                                            w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300
                                            ${activeNav === item.id
                                                    ? "bg-gradient-to-r from-blue-800 to-purple-700 text-white shadow-lg"
                                                    : "bg-[#3c495b] text-gray-100 hover:bg-[#5f6b82]"
                                                }
                                        `}
                                        >

                                            {item.icon}

                                            <span className="font-medium">
                                                {item.label}
                                            </span>

                                        </button>
                                    ))}
                                </div>

                                {/* Match Score */}
                                <div className="mt-10 bg-[#3c495b] rounded-2xl p-6 border border-gray-600/40">

                                    <p className="text-gray-100 text-sm mb-4">
                                        Match Score
                                    </p>

                                    <div className="flex items-center justify-center">

                                        <div
                                            className={`w-28 h-28 rounded-full border-4 flex items-center justify-center flex-col
                ${report.matchScore >= 80
                                                    ? "border-green-500"
                                                    : "border-red-500"
                                                }
            `}
                                        >

                                            <span className="text-3xl font-bold text-white">
                                                {report.matchScore}
                                            </span>

                                            <span className="text-gray-100 text-sm">
                                                %
                                            </span>

                                        </div>
                                    </div>

                                    <p
                                        className={`text-center mt-5 text-sm font-medium
            ${report.matchScore >= 80
                                                ? "text-green-400"
                                                : "text-red-400"
                                            }
        `}
                                    >
                                        {
                                            report.matchScore >= 80
                                                ? "Strong Match For This Role"
                                                : "Low Match For This Role"
                                        }
                                    </p>

                                </div>

                                {/* Download */}
                                <button
                                    onClick={() => getResumePdf(interviewId)}
                                    className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-blue-800 to-purple-700 text-white font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700 "
                                >
                                    Download Resume
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-6">

                            <div className="space-y-5">

                                {activeNav === "technical" && (

                                    <>
                                        <div className="flex items-center justify-between mb-5">

                                            <h2 className="text-3xl font-bold text-white">
                                                Technical Questions
                                            </h2>

                                            <div className="px-4 py-2 rounded-full bg-[#374151] border border-gray-600 text-blue-400 text-sm">
                                                {report.technicalQuestions.length} Questions
                                            </div>
                                        </div>

                                        {report.technicalQuestions.map((q, i) => (

                                            <QuestionCard
                                                key={i}
                                                item={q}
                                                index={i}
                                            />
                                        ))}
                                    </>
                                )}

                                {activeNav === "behavioral" && (

                                    <>
                                        <div className="flex items-center justify-between mb-5">

                                            <h2 className="text-3xl font-bold text-white">
                                                Behavioral Questions
                                            </h2>

                                            <div className="px-4 py-2 rounded-full bg-[#374151] border border-gray-600 text-orange-400 text-sm">
                                                {report.behavioralQuestions.length} Questions
                                            </div>
                                        </div>

                                        {report.behavioralQuestions.map((q, i) => (

                                            <QuestionCard
                                                key={i}
                                                item={q}
                                                index={i}
                                            />
                                        ))}
                                    </>
                                )}

                                {activeNav === "roadmap" && (

                                    <>
                                        <div className="flex items-center justify-between mb-5">

                                            <h2 className="text-3xl font-bold text-white">
                                                Preparation Roadmap
                                            </h2>

                                            <div className="px-4 py-2 rounded-full bg-[#374151] border border-gray-600 text-purple-400 text-sm">
                                                {report.preparationPlan.length} Days
                                            </div>
                                        </div>

                                        {report.preparationPlan.map((day, index) => (

                                            <RoadMapDay
                                                key={index}
                                                day={day}
                                                index={index}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Skill Gaps */}
                        <div className="col-span-12 lg:col-span-3">

                            <div className="bg-[#28303b] border border-gray-600/60 rounded-3xl p-6 sticky top-6">

                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Skill Gaps
                                </h2>

                                <div className="flex flex-wrap gap-3">

                                    {report.skillGaps.map((gap, i) => (

                                        <div
                                            key={i}
                                            className="px-4 py-3 rounded-xl bg-[#2f3b4d] border border-gray-600 text-purple-300 text-sm font-medium"
                                        >
                                            {gap}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Interview