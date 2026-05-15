import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { clockout, getAllAttendance, getCurrentSession, getMyAttendance, getTodayAttendance, markAttendance } from "../controllers/attendanceController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = Router()

router.post("/check-in", authMiddleware, markAttendance);
router.post("/check-out", authMiddleware, clockout)
router.get("/my", authMiddleware, getMyAttendance)
router.get("/today", authMiddleware, getTodayAttendance);
router.get("/all",authMiddleware,getAllAttendance)
router.get("/current", authMiddleware, getCurrentSession);

export default router