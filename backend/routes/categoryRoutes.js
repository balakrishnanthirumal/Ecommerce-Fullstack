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

router.route("/").post( createCategory);

router
  .route("/:categoryId")
  .put( updatCategory)

  .delete( deleteCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
