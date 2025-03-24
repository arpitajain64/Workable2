import { createSlice } from "@reduxjs/toolkit";

const initialJobs = [
    {
        _id: "1",
        title: "Software Engineer",
        description: "Looking for a skilled developer to join our team.",
        company: { name: "TechCorp" },
        position: 3,
        jobType: "Full-time",
        salary: "12"
    },
    {
        _id: "2",
        title: "UI/UX Designer",
        description: "Seeking a creative designer with experience in Figma.",
        company: { name: "DesignHub" },
        position: 2,
        jobType: "Part-time",
        salary: "8"
    },
    {
        _id: "3",
        title: "Data Scientist",
        description: "Analyzing large datasets and building predictive models.",
        company: { name: "DataWorks" },
        position: 5,
        jobType: "Remote",
        salary: "15"
    }
];

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: initialJobs,  // ✅ Mock jobs set at start
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload.length ? action.payload : initialJobs; // ✅ Fallback to mock jobs
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        addSavedJob: (state, action) => {
            if (!state.savedJobs.some(job => job._id === action.payload._id)) {
                state.savedJobs.push(action.payload);
            }
        },
        addAppliedJob: (state, action) => {
            if (!state.allAppliedJobs.some(job => job._id === action.payload._id)) {
                state.allAppliedJobs.push(action.payload);
            }
        }
    }
});

// Selectors
export const selectFilteredJobs = (state) => {
    return state.job.allJobs.filter(job =>
        job.title.toLowerCase().includes(state.job.searchJobByText.toLowerCase())
    );
};

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setSavedJobs,
    addSavedJob,
    addAppliedJob
} = jobSlice.actions;

export default jobSlice.reducer;