import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import Notification from "../models/Notification.js"; // Import Notification model

const router = express.Router();

// ✅ Admin - Post a job + Create a notification
router.route("/post").post(isAuthenticated, async (req, res) => {
    try {
        // Call the postJob function
        const response = await postJob(req, res);

        // Check if the job was successfully created before sending a notification
        if (response?.success && response.job) {
            await Notification.create({
                user: req.id, // Assuming req.id is set by isAuthenticated middleware
                message: `A new job "${response.job.title}" has been posted.`,
                type: "job_update"
            });
        }
    } catch (error) {
        console.error("Error posting job:", error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Error posting job" });
        }
    }
});

// ✅ Student - Get all jobs
router.route("/get").get(isAuthenticated, getAllJobs);

// ✅ Admin - Get jobs created by admin
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// ✅ Student - Get job details by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
