import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

app.listen(8000,()=>{
    console.log("Server is running on Port 8000")
})