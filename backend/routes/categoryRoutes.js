import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updatCategory,
  deleteCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

router.route("/").post( authorizeAdmin, createCategory);

router
  .route("/:categoryId")
  .put( authorizeAdmin, updatCategory)

  .delete( authorizeAdmin, deleteCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
