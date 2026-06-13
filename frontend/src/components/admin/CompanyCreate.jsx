import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name cannot be empty')
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                navigate(`/admin/companies/${res.data.company._id}`)
            }
        } catch (error) {
            console.error('Error creating company:', error)
            toast.error(error.response?.data?.message || 'Failed to create company')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Your Company Name</h1>
                        <p className="text-gray-400">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                            Company Name
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. JobHunt, Microsoft, etc."
                            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={() => navigate("/admin/companies")}
                            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={registerNewCompany}
                            disabled={isLoading || !companyName.trim()}
                            className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        >
                            {isLoading ? 'Creating...' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
