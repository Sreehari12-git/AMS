import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { clockout, getMyAttendance, markAttendance } from "../controllers/attendanceController.js";

const router = Router()

router.post("/check-in", authMiddleware, markAttendance);
router.post("/check-out", authMiddleware, clockout)
router.post("/my", authMiddleware, getMyAttendance)
export default router