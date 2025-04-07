import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/product.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";
// import upload from "../middleware/localUpload.middleware.js"; // Local upload middleware
import upload from "../middleware/upload.middleware.js"; // Cloudinary upload middleware
import reviewRoutes from "./review.route.js"; // Import review routes

const router = express.Router();

// nested routes for reviews
router.use("/:id/reviews", reviewRoutes);

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.post("/:id/upload", protect, isAdmin, upload.array("images", 5), uploadProductImage);

export default router;
