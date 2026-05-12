import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { clockout, getAllAttendance, getMyAttendance, getTodayAttendance, markAttendance } from "../controllers/attendanceController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = Router()

router.post("/check-in", authMiddleware, markAttendance);
router.post("/check-out", authMiddleware, clockout)
router.post("/my", authMiddleware, getMyAttendance)
router.post("/today", authMiddleware, getTodayAttendance);
router.post("/all",authMiddleware,getAllAttendance)


export default router