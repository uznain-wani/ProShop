// products will be fetched from productmodel.js

import express from "express";
import {getProducts,getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts} from
 "../controllers/productController.js"
import { admin, protect } from "../middleware/authMiddleware.js";



const router = express.Router();     //for using router in react 




// seperate routes are in controllers,we need to call them here

router.route("/").get(getProducts).post(protect,admin,createProduct)
router.route("/:id/reviews").post(protect,createProductReview)
router.get("/top",getTopProducts)
router.route("/:id").get(getProductById)
.delete(protect,admin,deleteProduct)
.put(protect,admin,updateProduct)




export default router