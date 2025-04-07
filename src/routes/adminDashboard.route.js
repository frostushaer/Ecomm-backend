import express from 'express';
import {
  getTotalSales,
  getAllOrders,
  getAllUsers,
  getAllProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../controllers/adminDashboard.controller.js';

import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/sales', protect, isAdmin, getTotalSales);
router.get('/orders', protect, isAdmin, getAllOrders);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/products', protect, isAdmin, getAllProducts);

// Category Management
router.post('/categories', protect, isAdmin, createCategory);
router.put('/categories/:id', protect, isAdmin, updateCategory);
router.delete('/categories/:id', protect, isAdmin, deleteCategory);
router.get('/categories', protect, isAdmin, getAllCategories);

export default router;
