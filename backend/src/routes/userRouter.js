import { Router } from "express";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = Router();

router.post("/create", createUser)
router.delete("/delete/:email", deleteUser)

export default router;
