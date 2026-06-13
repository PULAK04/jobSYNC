import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(company => company._id === e.target.value)
        setInput({...input, companyId: selectedCompany?._id || ""})
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.companyId) {
            toast.error('Please select a company')
            return
        }
        if (!input.title.trim()) {
            toast.error('Job title is required')
            return
        }

        try {
            setLoading(true)
            const res = await axios.post(
                `${JOB_API_END_POINT}/post`, 
                input,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.error('Post job error:', error)
            toast.error(error.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />
            <div className="flex items-center justify-center py-8 px-4">
                <form onSubmit={submitHandler} className="w-full max-w-4xl bg-gray-800 p-6 md:p-8 rounded-lg shadow-md border border-gray-700">
                    <h1 className="text-2xl font-bold mb-6 text-white">Post New Job</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div className="space-y-1">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title*</label>
                            <input
                            placeholder='eg. Frontend Developer'
                                id="title"
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Requirements */}
                        <div className="space-y-1">
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-300">Requirements</label>
                            <input
                            placeholder='eg. React, Node.js, etc.'
                                id="requirements"
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Salary */}
                        <div className="space-y-1">
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-300">Salary</label>
                            <input
                            placeholder='eg. 50000-70000'
                                id="salary"
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                            <input
                            placeholder='eg. Remote, Bangalore'
                                id="location"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Job Type */}
                        <div className="space-y-1">
                            <label htmlFor="jobType" className="block text-sm font-medium text-gray-300">Job Type</label>
                            <input
                                placeholder='eg. Full-time, Part-time'
                                id="jobType"
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Experience */}
                        <div className="space-y-1">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-300">Experience Level</label>
                            <input
                            placeholder='eg. 2-3 years'
                                id="experience"
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Position */}
                        <div className="space-y-1">
                            <label htmlFor="position" className="block text-sm font-medium text-gray-300">Number of Positions</label>
                            <input
                            placeholder='eg. 5'
                                id="position"
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                min="0"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Company Select */}
                        {companies.length > 0 ? (
                            <div className="space-y-1">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company*</label>
                                <select
                                placeholder='Select a company'
                                    id="company"
                                    value={input.companyId}
                                    onChange={selectChangeHandler}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    required
                                >
                                    <option value="">Select a company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="md:col-span-2">
                                <p className="text-sm text-red-500 font-medium text-center py-2">
                                    *Please register a company first before posting jobs
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        {loading ? (
                            <button
                                type="button"
                                disabled
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                            >
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Posting Job...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={companies.length === 0}
                                className={`w-full py-2 px-4 rounded-md text-white ${companies.length === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                Post New Job
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob
