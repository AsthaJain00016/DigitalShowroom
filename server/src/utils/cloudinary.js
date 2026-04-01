import dotenv from "dotenv"
import path from "path"
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
}

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    throw new Error("Cloudinary configuration missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD_API_KEY, CLOUDINARY_CLOUD_API_SECRET in .env")
}

cloudinary.config(cloudinaryConfig)

export const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null

        const response=await cloudinary.uploader.upload(localFilePath,{
            folder:"vardhman-products"
        });

        fs.unlinkSync(localFilePath)

        return response;
    }catch(error){
        fs.unlinkSync(localFilePath)

        throw error
    }
}