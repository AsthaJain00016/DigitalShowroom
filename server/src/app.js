import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.use((req,res,next)=>{
    res.setHeader("Content-Security-Policy","script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 ");
    next()
})

import userRouter from "./routes/user.route.js"
import categoryRouter from "./routes/category.route.js"
import productRouter from "./routes/product.route.js"
import contactRouter from "./routes/contact.route.js"
import errorHandler from "./middlewares/error.middleware.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/contact",contactRouter)

app.use(errorHandler)

export {app}