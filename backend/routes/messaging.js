import express from "express";
import { sendMessage, getMessages } from "../controllers/messaging.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Send a message
router.post("/send", isAuthenticated, sendMessage);

// Get messages between users
router.get("/:receiverId", isAuthenticated, getMessages);

export default router;
