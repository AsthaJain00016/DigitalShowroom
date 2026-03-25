import { Category } from "../models/category.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCategory=asyncHandler(async(req,res)=>{
    const {name}=req.body;

    if(!name){
        throw new ApiError(400,"Name of the category is required")
    }
    const existing=await Category.findOne({name})
    if(existing){
        throw new ApiError(400,"This category already exists")
    }
    const category=await Category.create({name})

    return res.status(201).json(new ApiResponse(201,category,"Category created successfully!"))
})

const getAllCategories=asyncHandler(async(req,res)=>{
    const category=await Category.find()

    return res.status(200).json(new ApiResponse(200,category,"All categories fetched successfully"))
})

const getSingleCategory=asyncHandler(async(req,res)=>{
    const {_id}=req.params;

    const category=await Category.findById(_id)
    if(!category){
        throw new ApiError(404,"Category not found!")
    }

    return res.status(200).json(new ApiResponse(200,category,"Category fetched successfully"))
})

const updateCategory=asyncHandler(async(req,res)=>{
    const {_id}=req.params;

    const category=await Category.findById(_id)

    if(!category){
        throw new ApiError(404,"Category not found")
    }
    const updatedData=req.body
    const updatedCategory=await Category.findByIdAndUpdate(
        _id,
        updatedData,
        {new:true}
    )

    return res.status(200).json(new ApiResponse(200,updatedCategory,"Category updated successfully"))
})  

const deleteCategory=asyncHandler(async(req,res)=>{
    const {_id}=req.params;

    const category=await Category.findById(_id)
    if(!category){
        throw new ApiError(404,"Category not found")
    }

    await category.deleteOne()

    res.status(200).json(200,null,"Category deleted successfully!")

})

export {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}