import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  getProductReviews,
  postReview,
  deleteReview,
} from '../controllers/review.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getProductReviews);
router.post('/', protect, postReview);
router.delete('/:reviewId', protect, deleteReview);

export default router;
