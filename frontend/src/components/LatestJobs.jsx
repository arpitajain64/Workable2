import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs = [] } = useSelector(store => store.job); // Default to empty array

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            {allJobs.length === 0 ? (
                <p className="text-center text-gray-600 my-10">No job listings available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;
