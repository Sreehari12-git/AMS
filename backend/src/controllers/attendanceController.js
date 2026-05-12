import prisma  from "../config/prisma.js";

export const markAttendance = async(req,res) => {
    try {
        const userId = req.user.id;

        const currentDate = new Date();

        const day = currentDate.toLocaleDateString("en-US", {
            weekday: "long"
        })

        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);

        const existing = await prisma.attendance.findUnique({
            where: { userId_date: { userId, date: startOfDay}}
        })

        if(existing?.clockIn) {
            return res.status(400).json({message: "Already clocked in"});
        }

        const attendance = await prisma.attendance.create({
            data: {
                userId,
                date: currentDate,
                day,
                clockIn: currentDate,
                status: "PRESENT"
            }
        })

        res.status(201).json({
            message: "Attendance Marked Successfully",
            attendance
        })

    }
    catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}