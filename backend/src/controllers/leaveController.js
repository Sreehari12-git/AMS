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

export const updateLeaveStatus = async(req,res) => {
    try {
        const {leaveId, status} = req.body;

        const leave = await prisma.leave.findUnique({
            where: {id : leaveId}
        })

        if(!leave) {
            return res.status(404).json({ message : "Leave not found"});
        }

        await prisma.leave.update({
            where: {
                id: leaveId
            },
            data: {
                status
            }
        })

        if(status === "APPROVED") {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const difference = end.getTime() - start.getTime();
            const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1);
            const leaveBalance = await prisma.leaveBalance.findUnique({
                where: {
                    userId : leave.userId
                }
            });

            if(leave.type === "ANNUAL") {
                await prisma.leaveBalance.update({
                    where: {
                        userId: leave.userId
                    },
                    data: {
                        annualUsed: leaveBalance.annualUsed + days
                    }
                })
            } else if(leave.type === "SICK") {
                await prisma.leaveBalance.update({
                    where: {
                        userId: leave.userId
                    },
                    data: {
                        sickUsed: leaveBalance.sickUsed + days
                    }
                })
            } else if(leave.type === "REMOTE") {
                await prisma.leaveBalance.update({
                    where: {
                        userId: leave.userId
                    },
                    data:{
                        remoteUsed: leaveBalance.remoteUsed + days
                    }
                })
            }
        }
        res.status(200).json({
            message: `Leave approved successfully`
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

export const getLeaveBalance = async(req,res) => {
    try{
        const userId = req.params.userId;

        const leaveBalance = await prisma.leaveBalance.findUnique({
            where: {userId}
        });

        if(!leaveBalance) {
            return res.status(404).json({
                message: "Leave balance not found"
            })
        }

        const annualRemaining = leaveBalance.annualTotal - leaveBalance.annualUsed;
        const sickRemaining = leaveBalance.sickTotal - leaveBalance.sickUsed;
        const remoteRemaining = leaveBalance.remoteTotal - leaveBalance.remoteUsed;

        res.status(200).json({
            annual: {
                total: leaveBalance.annualTotal,
                used: leaveBalance.annualUsed,
                remaining : annualRemaining

            },
            sick: {
                total: leaveBalance.sickTotal,
                used: leaveBalance.sickUsed,
                remaining: sickRemaining
            },
            remote: {
                total: leaveBalance.remoteTotal,
                used: leaveBalance.remoteUsed,
                remaining: remoteRemaining
            }
        }

        )
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

