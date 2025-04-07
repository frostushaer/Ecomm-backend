import express from "express";
import {
  getMe, updateMe, changePassword,
  adminCreateUser, adminDeleteUser
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/change-password", protect, changePassword);

router.post("/", protect, isAdmin, adminCreateUser);
router.delete("/:id", protect, isAdmin, adminDeleteUser);

export default router;
