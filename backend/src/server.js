import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();
import attendanceRoute from "./routes/attendanceRoutes.js"
import userRouter from "./routes/userRouter.js"
import leaveRoute from "./routes/leaveRoute.js"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:1000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

const PORT = process.env.PORT

app.use(express.json())

app.use('/', authRoutes)
app.use("/attendance", attendanceRoute)
app.use("/users", userRouter)
app.use("/leave",leaveRoute)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);  
})
