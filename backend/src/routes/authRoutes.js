import { Router } from "express"
import { loginUser } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route Working",
        user: req.user
    });
});

router.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), (req,res) => {
    res.json({
        message: "Welcome Admin"
    })
})

export default router;