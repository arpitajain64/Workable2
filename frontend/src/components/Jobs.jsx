import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { setSavedJobs } from '@/redux/jobSlice';

const Jobs = () => {
    const { allJobs, searchedQuery, savedJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    const handleSaveJob = (job) => {
        if (!savedJobs.some(saved => saved._id === job._id)) {
            dispatch(setSavedJobs([...savedJobs, job]));
            toast.success('Job saved successfully!');
        } else {
            toast.info('Job is already saved.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {filterJobs.length === 0 ? (
                            <div className="text-center text-gray-600 text-lg mt-10">
                                No jobs found.
                            </div>
                        ) : (
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}>
                                        <Job job={job} handleSaveJob={() => handleSaveJob(job)} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;