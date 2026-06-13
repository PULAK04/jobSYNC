import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Kolkata", "Pune", "Mumbai","Hyderabad"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer","Graphic Designing", "Data Science"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    return (
        <div className='w-full bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700'>
            <h1 className='font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-200'>
                Filter Jobs
            </h1>
            <hr className='border-gray-700 mb-5' />
            
            <div className="space-y-7">
                {filterData.map((data, index) => (
                    <div key={`filter-group-${index}`} className="space-y-3">
                        <h2 className='font-semibold text-gray-300'>{data.filterType}</h2>
                        <div className="space-y-3">
                            {data.array.map((item, idx) => {
                                const itemId = `filter-${index}-${idx}`
                                return (
                                    <div 
                                        key={itemId} 
                                        className='flex items-center space-x-3 group cursor-pointer'
                                        onClick={() => changeHandler(item)}
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="radio"
                                                id={itemId}
                                                name="job-filter"
                                                value={item}
                                                checked={selectedValue === item}
                                                onChange={() => changeHandler(item)}
                                                className="h-4 w-4 appearance-none rounded-full border-2 border-gray-600 checked:border-purple-500 transition-all duration-200 cursor-pointer"
                                            />
                                            <div className={`absolute inset-0 m-auto h-2 w-2 rounded-full bg-purple-500 transition-opacity duration-200 ${selectedValue === item ? 'opacity-100' : 'opacity-0'}`}></div>
                                        </div>
                                        <label 
                                            htmlFor={itemId} 
                                            className={`text-sm transition-colors duration-200 cursor-pointer ${selectedValue === item ? 'text-purple-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
                                        >
                                            {item}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard