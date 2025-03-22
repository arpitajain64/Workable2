import express from "express";
import { 
    login, 
    logout, 
    register, 
    updateProfile, 
    getNotifications, 
    markNotificationAsRead 
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// New notification routes
router.route("/notifications").get(isAuthenticated, getNotifications);
router.route("/notifications/:id/read").post(isAuthenticated, markNotificationAsRead);

export default router;
