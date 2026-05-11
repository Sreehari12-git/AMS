import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();

const app = express()

const PORT = process.env.PORT

app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);  
})