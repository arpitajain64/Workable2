import Notification from "../models/Notification.js";

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching notifications", error });
    }
};

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const { recipient, message, type } = req.body;
        const notification = new Notification({ recipient, message, type });
        await notification.save();
        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating notification", error });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { read: true });
        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating notification", error });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting notification", error });
    }
};
