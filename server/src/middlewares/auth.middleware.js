import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"

const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized request")
    }

    const decodeToken=jwt.verify(token,process.env.JWT_SECRET)

    const user=await User.findById(decodeToken._id).select("-password")

    if(!user){
        throw new ApiError(401,"Invalid token")
    }
    req.user=user

    next()
})

export default verifyJWT
