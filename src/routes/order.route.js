import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  adminUpdateOrderStatus,
} from '../controllers/order.controller.js';

import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.delete('/:id', protect, cancelOrder);
router.put('/:id/status', protect, isAdmin, adminUpdateOrderStatus);

export default router;
