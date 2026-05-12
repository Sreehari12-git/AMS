import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { clockout, markAttendance } from "../controllers/attendanceController.js";

const router = Router()

router.post("/check-in", authMiddleware, markAttendance);
router.post("/check-out", authMiddleware, clockout)

export default router