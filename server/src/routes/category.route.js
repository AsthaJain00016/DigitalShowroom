import { Router } from "express";
import { createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory } from "../controllers/category.controller.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()

router.route("/")
.post(verifyJWT,verifyAdmin,upload.single("image"),createCategory)
.get(getAllCategories)

router.route("/:id")
.get(getSingleCategory)
.patch(verifyJWT,verifyAdmin,upload.single("image"),updateCategory)
.delete(verifyJWT,verifyAdmin,deleteCategory)

export default router