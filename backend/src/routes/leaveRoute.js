import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { applyLeave, getAllLeaves, getLeaveBalance, updateLeaveStatus } from "../controllers/leaveController.js";
import { getMyLeaves } from "../controllers/leaveController.js";

const router = Router();

router.post("/apply", authMiddleware,applyLeave)
router.get("/myleaves", authMiddleware,getMyLeaves)
router.put("/update", authMiddleware, updateLeaveStatus)
router.get("/leave-balance", authMiddleware, getLeaveBalance)
router.get("/all", authMiddleware, getAllLeaves);

export default router
