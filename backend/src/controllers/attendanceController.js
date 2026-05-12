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
                date: startOfDay,
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

export const clockout = async(req,res) => {
    try {
        const userId = req.user.id;

        const today = new Date();
        today.setHours(0,0,0,0);

        const attendance = await prisma.attendance.findUnique({
            where: {userId_date: { userId, date:today}},
        })

        if(!attendance?.clockIn) {
            return res.status(400).json({ message: "Not clocked in"});
        }

        if(attendance.clockOut) {
            return res.status(400).json({message: "Already clocked out"});
        }

        const clockOutTime = new Date();

        const totalMinutes = Math.floor(
                    (clockOutTime.getTime() - new Date(attendance.clockIn).getTime()) / (1000 * 60)
        );
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const duration = `${hours}h ${mins}m`;
        const totalHours = parseFloat((totalMinutes / 60).toFixed(2));
        const updateAttendance = await prisma.attendance.update({
            where: {
                userId_date: {
                    userId,
                    date: today,  
                }
            },
            data: {
                clockOut: clockOutTime,
                totalHours,
                duration
            }
        });

        res.status(200).json({
            message: "Checked out successfully",
            updateAttendance
        })
    }  catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}