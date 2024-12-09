import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get( authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get( getCurrentUserProfile)
  .put( updateCurrentUserProfile);

// Admin ROuters
router
  .route("/:id")
  .delete( authorizeAdmin, deleteUserById)
  .get( authorizeAdmin, getUserById)
  .put( authorizeAdmin, updateUserById);

export default router;
