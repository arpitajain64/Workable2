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

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/notifications", isAuthenticated, getNotifications);
router.post("/notifications/:id/read", isAuthenticated, markNotificationAsRead);

export default router;
