import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

const registerUser=asyncHandler(async(req,res)=>{
    const {username, email, phone, password, address}=req.body;

    if(!username || !email || !phone || !password || !address){
        throw new ApiError(400,"All fields are required")
    }

    const existingUser=await User.findOne({
        $or:[{email},{username}],
    })

    if(existingUser){
        throw new ApiError(400,"User with this email id or username already exists")
    }

    const user=await User.create({
        username,
        email,
        password,
        phone,
        address
    })
    user.password=undefined
    res.status(201).json(new ApiResponse(201,user,"User created successfully"))
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email , password , username}=req.body

    if((!email && !username) || !password){
        throw new ApiError(400,"Email or username and password are required! ")
    }

    const user=await User.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isMatch=await user.isPasswordCorrect(password)

    if(!isMatch){
        throw new ApiError(401,"invalid credentials")
    }

    const token=jwt.sign({
        _id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRY
    }
)

    user.password=undefined;

    return res.status(200)
    .cookie("token",token,{
        httpOnly:true,
        secure:false
    })
    .json(new ApiResponse(200,
        {user}
    , "Login successfully"))


})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"User fetched successfully"))
})

const logoutUser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful"));

})

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
}