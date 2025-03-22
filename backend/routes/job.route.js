import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import Notification from "../models/Notification.js"; // Import Notification model

const router = express.Router();

router.route("/post").post(isAuthenticated, async (req, res) => {
    try {
        const job = await postJob(req, res);

        // Create a notification for the job posting
        if (job) {
            await Notification.create({
                user: req.user._id, // Assuming the user is posting the job
                message: `A new job "${job.title}" has been posted.`,
                type: "job_update"
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error posting job" });
    }
});

router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
