import bcrypt from "bcrypt"
import prisma from "../config/prisma.js";

export const createUser = async(req,res) => {
    try {
        const { email, name, password, role} = req.body;

         if (!email || !name || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
        });
    }
    
     const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
            data: {
                full_name: name,
                email,
                password: hashedPassword,
                role,
                leaveBalance: {
                    create: {
                        annualTotal: 15,
                        annualUsed: 0,
                        sickTotal: 10,
                        sickUsed: 0,
                        remoteTotal: 10,
                        remoteUsed: 0
                    }
                }
            }
        })
        res.json({ message: "Employee created successfully", user });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {

    try {

        const { email } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        await prisma.attendance.deleteMany({
            where: { userId: user.id }
        });

        await prisma.leave.deleteMany({
            where: { userId: user.id }
        });

        await prisma.user.delete({
            where: {
                email
            }
        });

        res.status(200).json({
            message: "Deleted user successfully"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

}