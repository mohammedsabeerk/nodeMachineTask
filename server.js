import express from "express"
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express();

app.use(express.json())

connectDB()

app.use("/",authRoutes)
app.use("/",userRoutes)

app.get("/",(req,res)=>{
    res.json({message:"API Running"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on port",process.env.PORT)

})