import  { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";

const router=Router()

router.route("/")
.post(verifyJWT,verifyAdmin,upload.array("images",5),createProduct)
.get(getAllProducts)

router.route("/:id")
.get(getSingleProduct)
.patch(verifyJWT,verifyAdmin,upload.array("images",5),updateProduct)
.delete(verifyJWT,verifyAdmin,deleteProduct)

export default router