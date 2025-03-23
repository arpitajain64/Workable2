import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// User Registration
export const register = async (req, res) => {
    try {
        console.log("Received file:", req.file); // Debugging log

        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        let profilePhoto = "https://res.cloudinary.com/demo/image/upload/v1699999999/default-profile.png"; // Default Profile Picture

        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            console.log("File URI:", fileUri); // Debugging log

            try {
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                console.log("Cloudinary response:", cloudResponse); // Debugging log
                profilePhoto = cloudResponse.secure_url;
            } catch (cloudError) {
                console.error("Cloudinary Upload Error:", cloudError);
                return res.status(500).json({ message: "File upload failed", success: false });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto },
        });

        return res.status(201).json({ message: "Account created successfully", success: true });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role", success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, "abc", { expiresIn: '1d' });

        return res.status(200).cookie("token", token, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Logout
export const logout = async (req, res) => {
    return res.status(200).cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "strict",
    }).json({ message: "Logged out successfully", success: true });
};

// Update User Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber } = req.body;
        const userId = req.user._id;

        if (!fullname || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.fullname = fullname;
        user.phoneNumber = phoneNumber;

        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url;
        }

        await user.save();
        return res.status(200).json({ message: "Profile updated successfully", success: true });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Get Notifications (Fix for Import Issue)
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("notifications");

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ notifications: user.notifications, success: true });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Mark Notification as Read
export const markNotificationAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const notification = user.notifications.find(n => n._id.toString() === id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found", success: false });
        }

        notification.read = true;
        await user.save();

        return res.status(200).json({ message: "Notification marked as read", success: true });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
