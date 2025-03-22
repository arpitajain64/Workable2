import { Feedback } from "../models/Feedback.js";

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const userId = req.user._id;
        const { message, rating } = req.body;

        if (!message || !rating) {
            return res.status(400).json({ success: false, message: "Message and rating are required." });
        }

        const feedback = await Feedback.create({ user: userId, message, rating });

        res.status(201).json({ success: true, message: "Feedback submitted successfully.", data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all feedbacks (Admin only)
export const getFeedbacks = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied." });
        }

        const feedbacks = await Feedback.find().populate("user", "fullname email");

        res.status(200).json({ success: true, data: feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
