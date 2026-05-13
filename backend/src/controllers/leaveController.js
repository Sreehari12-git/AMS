import prisma from "../config/prisma.js";

export const applyLeave = async(req,res) => {
    try {
        const userId = req.user.id;
        const { type,startDate,endDate} = req.body;

        const leave = await prisma.leave.create({
            data: {
                userId,
                type,
                status : "PENDING",
                startDate : new Date(startDate),
                endDate: new Date(endDate),
            }
        });

        res.json({message: "Leave Applied", leave});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server  error"});
    }
}

export const getMyLeaves = async(req,res) => {
    try {
        const userId = req.user.id;
        
        const leaves = await prisma.leave.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        
        res.status(200).json(leaves);
    } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
