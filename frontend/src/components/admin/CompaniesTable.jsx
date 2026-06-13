import React, { useEffect, useState } from 'react'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const [openPopoverId, setOpenPopoverId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 text-sm text-gray-400">
                A list of your recent registered companies
            </div>
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Logo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {filterCompany?.length > 0 ? (
                        filterCompany.map((company) => (
                            <tr key={company._id} className="hover:bg-gray-800 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-10 w-10 rounded-full overflow-hidden">
                                        <img
                                            src={company.logo || '/default-company.png'}
                                            alt={company.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    {company.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {company?.createdAt?.split("T")[0]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative inline-block text-left">
                                        <button
                                            onClick={() => setOpenPopoverId(openPopoverId === company._id ? null : company._id)}
                                            className="inline-flex justify-center items-center p-2 rounded-md hover:bg-gray-700 transition"
                                        >
                                            <MoreHorizontal className="h-4 w-4 text-gray-300" />
                                        </button>

                                        {openPopoverId === company._id && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 z-10">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/companies/${company._id}`)
                                                            setOpenPopoverId(null)
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left transition"
                                                    >
                                                        <Edit2 className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                No companies found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CompaniesTable
