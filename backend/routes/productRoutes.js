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
  .post(authenticate, authorizeAdmin, formidable(), addProuct);

router.route("/allproducts").get(fetchAllProduct);

router.route("/top").get(fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("/filtered-products").post(filterProducts);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .get(fetchProductById)
  .delete(authenticate, authorizeAdmin, removeProduct);

router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, addProductReview);

export default router;
