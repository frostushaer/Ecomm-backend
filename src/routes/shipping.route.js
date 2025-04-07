import express from 'express';
import {
  getShippingDetails,
  updateShippingStatus,
} from '../controllers/shipping.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get shipping details (User/Admin)
router.get('/:orderId', protect, getShippingDetails);

// Update shipping status (Admin only)
router.put('/:orderId', protect, isAdmin, updateShippingStatus);

export default router;
