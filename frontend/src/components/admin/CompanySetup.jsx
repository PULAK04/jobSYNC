import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            })
        }
    }, [singleCompany])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.name.trim()) {
            toast.error('Company name is required')
            return
        }

        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.error('Update error:', error)
            toast.error(error.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate("/admin/companies")}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font-medium">Back</span>
                        </button>
                        <h1 className="text-xl font-bold text-white">Company Setup</h1>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Company Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                                    Website
                                </label>
                                <input
                                    id="website"
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">
                                    Logo
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-900 file:text-blue-300
                                        hover:file:bg-blue-800"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            {loading ? (
                                <button
                                    type="button"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                                    disabled
                                >
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Updating...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                                >
                                    Update Company
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
