import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { markAttendance } from "../controllers/attendanceController.js";

const router = Router()

router.post("/check-in", authMiddleware, markAttendance);

export default router