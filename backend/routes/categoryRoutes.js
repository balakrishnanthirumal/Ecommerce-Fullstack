import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory } from "../controllers/categoryController.js";

router.route("/").post(authenticate, authorizeAdmin, createCategory);

export default router;
