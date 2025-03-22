import express from "express";
import { submitFeedback, getFeedbacks } from "../controllers/feedback.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Submit feedback
router.post("/submit", isAuthenticated, submitFeedback);

// Get all feedbacks (Admin only)
router.get("/all", isAuthenticated, getFeedbacks);

export default router;
