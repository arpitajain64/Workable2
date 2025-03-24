import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const JobDescription = () => {
    const { singleJob, savedJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Handle Apply to Job
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...(singleJob.applications || []), { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error applying to job");
        }
    };

    // Handle Save Job
    const saveJobHandler = async () => {
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/save/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                setIsSaved(true);
                toast.success("Job saved successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to save job");
        }
    };

    // Fetch Job Details
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    const job = res.data.job;
                    dispatch(setSingleJob(job));
                    setIsApplied(job?.applications?.some(application => application.applicant === user?._id) || false);
                    setIsSaved(Array.isArray(savedJobs) && savedJobs.some(job => job._id === job._id));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id, savedJobs]);

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                    <Button onClick={saveJobHandler} className="bg-gray-300 hover:bg-gray-400 rounded-lg">
                        {isSaved ? <FaBookmark className="text-yellow-500" /> : <FaRegBookmark />}
                    </Button>
                </div>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;