import { Router } from "express";
import { createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory } from "../controllers/category.controller.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/")
.post(verifyJWT,verifyAdmin,createCategory)
.get(getAllCategories)

router.route("/:id")
.get(getSingleCategory)
.patch(verifyJWT,verifyAdmin,updateCategory)
.delete(verifyJWT,verifyAdmin,deleteCategory)

export default router