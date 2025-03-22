import { Message } from "../models/Message.js";
import { User } from "../models/user.model.js";

// Send a message
export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.user._id; 

        if (!receiverId || !content) {
            return res.status(400).json({ success: false, message: "Receiver ID and content are required." });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ success: false, message: "Receiver not found." });
        }

        const message = await Message.create({ sender: senderId, receiver: receiverId, content });

        res.status(201).json({ success: true, message: "Message sent successfully.", data: message });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all messages between the logged-in user and another user
export const getMessages = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId } = req.params;

        if (!receiverId) {
            return res.status(400).json({ success: false, message: "Receiver ID is required." });
        }

        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
