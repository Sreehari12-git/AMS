import { Router } from "express"
import { loginUser } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route Working",
        user: req.user
    });

});

export default router