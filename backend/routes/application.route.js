import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job (Ensure job ID exists in params)
router.post("/apply/:id", isAuthenticated, applyJob);

// Get applied jobs
router.get("/get", isAuthenticated, getAppliedJobs);

// Get applicants for a specific job (Ensure job ID exists in params)
router.get("/:id/applicants", isAuthenticated, getApplicants);

// Update application status (Use PATCH for updating)
router.patch("/status/:id/update", isAuthenticated, updateStatus);

export default router;
