import express from "express";
import { initiatePayment, verifyPayment } from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, initiatePayment);
router.post("/verify", protect, verifyPayment);

export default router;
