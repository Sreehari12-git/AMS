import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { applyLeave } from "../controllers/leaveController.js";
import { getMyLeaves } from "../controllers/leaveController.js";

const router = Router();

router.post("/apply", authMiddleware,applyLeave)
router.get("/myleaves", authMiddleware,getMyLeaves)

export default router