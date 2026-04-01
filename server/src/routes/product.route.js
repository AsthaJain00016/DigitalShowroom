import  { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct,getProductByCategory, getFeaturedProduct, getSaleProduct } from "../controllers/product.controller.js";

const router=Router()

router.route("/")
.post(verifyJWT,verifyAdmin,upload.array("images",5),createProduct)
.get(getAllProducts)

router.route("/:id")
.get(getSingleProduct)
.patch(verifyJWT,verifyAdmin,upload.array("images",5),updateProduct)
.delete(verifyJWT,verifyAdmin,deleteProduct)

router.route("/featured").get(getFeaturedProduct)
router.route("/sale").get(getSaleProduct)

router.route("/category/:categoryId").get(getProductByCategory)

export default router