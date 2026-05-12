import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();
import attendanceRoute from "./routes/attendanceRoutes.js"
import userRouter from "./routes/userRouter.js"

const app = express()

const PORT = process.env.PORT

app.use(express.json())

app.use('/', authRoutes)
app.use("/attendance", attendanceRoute)
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);  
})