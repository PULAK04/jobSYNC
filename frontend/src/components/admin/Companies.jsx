import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Filter by company name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        Add New Company
                    </button>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-1">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
