import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProuct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProduct,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post( formidable(), addProuct);

router.route("/allproducts").get(fetchAllProduct);

router.route("/top").get(fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("/filtered-products").post(filterProducts);

router
  .route("/:id")
  .put(  formidable(), updateProductDetails)
  .get(fetchProductById)
  .delete( removeProduct);

router
  .route("/:id/reviews")
  .post( checkId, addProductReview);

export default router;
