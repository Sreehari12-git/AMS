import { Router } from "express";
import { createUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCurrentSession } from "../controllers/attendanceController.js";

const router = Router();

router.post("/create", createUser)
router.delete("/delete/:email", deleteUser)
export default router;
