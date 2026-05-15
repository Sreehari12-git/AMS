import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const loginUser = async(req,res) => {

        try {
            const {email,password} = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if(!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "10d"
                }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    fullName: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch(error) {
            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
}
