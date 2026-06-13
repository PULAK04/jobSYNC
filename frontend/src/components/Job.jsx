import React from 'react'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { saveJob, removeSavedJob } from "../redux/savedJobSlice";
import { BookmarkCheck } from "lucide-react";
import { useInterview } from '../interview/hooks/useInterview'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();

const { savedJobs } = useSelector(
    store => store.savedJobs
);

const isSaved = savedJobs.some(
    item => item._id === job._id
);


const saveJobHandler = () => {

     if (!user) {

        navigate("/login");

        return;
    }

    if (isSaved) {

        dispatch(removeSavedJob(job._id));

    } else {

        dispatch(saveJob(job));
    }
};

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }

    return (
        <div className='p-6 rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>



            </div>

            <div className='flex items-center gap-4 my-4'>
                <div className='p-1 border border-gray-600 rounded-full hover:border-orange-400 transition-colors'>
                    <div className='h-12 w-12 rounded-full overflow-hidden'>
                        <img
                            src={job?.company?.logo}
                            alt={job?.company?.name}
                            className='h-full w-full object-cover'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150';
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='font-medium text-lg text-gray-200'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-xl my-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400'>
                    {job?.title}
                </h1>
                <p className='text-gray-400 text-sm line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-5'>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-blue-300 bg-blue-900/50'>
                    {job?.position} Positions
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-red-300 bg-red-900/50'>
                    {job?.jobType}
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-bold text-purple-300 bg-purple-900/50'>
                    {job?.salary}LPA
                </span>
            </div>

           <div className='flex items-center justify-between mt-6'>
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className='px-5 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-purple-400 hover:text-purple-400 transition-colors duration-200'
                >
                    Details
                </button>



                <button
    onClick={saveJobHandler}
    className={`p-2 rounded-lg border transition-all duration-300
        ${
            isSaved
                ? "bg-orange-500/20 border-orange-500 text-orange-400"
                : "bg-gray-700 border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-400"
        }
    `}
>

    {
        isSaved
            ? <BookmarkCheck className='w-5 h-5' />
            : <Bookmark className='w-5 h-5' />
    }

</button>




               
            </div>
        </div>
    )
}

export default Job