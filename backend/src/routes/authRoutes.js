import { Router } from "express"
import { loginUser } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginUser);

export default router;