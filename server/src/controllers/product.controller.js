import { Product } from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import  asyncHandler  from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct=asyncHandler(async(req,res)=>{
    const {
      name,
      price,
      description,
      category,
      stock,
      isFeatured,
      isOnSale,
      discountPrice,
    } = req.body;

    if(!name || !price || !description || !category){
        throw new ApiError(400,"All fields such as name, price, description, category are required!")
    }

    const imageUrls=[];

    for (const file of req.files){
        const result=await uploadOnCloudinary(file.path);
        imageUrls.push(result.secure_url)
    }

    const product=await Product.create({
        name,
        price,
        description,
        category,
        stock,
        isFeatured: ["true", "on", true].includes(isFeatured),
        isOnSale: ["true", "on", true].includes(isOnSale),
        discountPrice: Number(discountPrice) || 0,
        images:imageUrls
    })

    return res.status(201).json(new ApiResponse(201,product,"Product created successfully"))
})

const getAllProducts=asyncHandler(async(req,res)=>{
    const product=await Product
    .find()
    .sort({createdAt:-1})
    .populate("category");

    return res.status(200).json(new ApiResponse(200,product,"All products fetched successfully!"))
})

const getSingleProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    const product=await Product.findById(id).populate("category")

    if(!product){
        throw new ApiError(404,"Product not found")
    }

    return res.status(200).json(new ApiResponse(200,product,"Product fetched successfully"))
})

const updateProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    const product=await Product.findById(id);

    if(!product){
        throw new ApiError(404,"Product which is to be updated is not found")
    }

    const imageUrls=req.files?.map(file=>file.path)

    const { isFeatured, isOnSale, discountPrice } = req.body;
    const updatedData={
        ...req.body,
        isFeatured: ["true", "on", true].includes(isFeatured),
        isOnSale: ["true", "on", true].includes(isOnSale),
        discountPrice: Number(discountPrice) || undefined,
    }

    if(imageUrls && imageUrls.length>0){
        updatedData.images=imageUrls
    }
    const updatedProduct= await Product.findByIdAndUpdate(
        id,
        updatedData,
        {new:true}
    )
    return res.status(200).json(new ApiResponse(200,updatedProduct,"Product updated successfully!"))
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    const product=await Product.findById(id)

    if(!product){
        throw new ApiError(404,"Product not found")
    }

    await product.deleteOne()

    return res.status(200).json(new ApiResponse(200,null,"Product deleted successfully!"))
})

const getProductByCategory=asyncHandler(async(req,res)=>{
    const {categoryId}=req.params

    const products=await Product.find({
        category:categoryId
    }).sort({createdAt:-1}).populate("category")

    return res.status(200).json(new ApiResponse(200,products,"Products by category fetched successfully "))
})

const getFeaturedProduct=asyncHandler(async(req,res)=>{
    const products=await Product.find({isFeatured:true}).sort({createdAt:-1})

    return res.status(200).json(new ApiResponse(200,products,"Featured Products fetched successfully"))
})


const getSaleProduct=asyncHandler(async(req,res)=>{
    const products=await Product.find({isOnSale:true}).sort({createdAt:-1})

    return res.status(200).json(new ApiResponse(200,products,"Featured Products fetched successfully"))
})

export {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    getFeaturedProduct,
    getSaleProduct
}