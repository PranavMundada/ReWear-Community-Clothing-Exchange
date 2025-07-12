import express from 'express';
import {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
  getMyItems,
  getItemsByCategory,
  toggleFavorite,
  getFavoriteItems,
  createSwapRequest,
  getReceivedSwapRequests,
  getSentSwapRequests,
  respondToSwapRequest,
  completeSwap,
  getItemStats,
} from '../controller/itemController.js';

import { protect, restrictTo } from '../controller/authController.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllItems);
router.route('/category/:category').get(getItemsByCategory);
router.route('/:id').get(getItem);

// Protected routes (require authentication)
router.use(protect);

// Item CRUD operations
router.route('/').post(createItem);
router.route('/:id').patch(updateItem).delete(deleteItem);

// User-specific item routes
router.route('/user/my-items').get(getMyItems);
router.route('/user/favorites').get(getFavoriteItems);
router.route('/:id/favorite').patch(toggleFavorite);

// Swap request routes
router.route('/:itemId/swap-request').post(createSwapRequest);
router.route('/swap-requests/received').get(getReceivedSwapRequests);
router.route('/swap-requests/sent').get(getSentSwapRequests);
router.route('/swap-requests/:requestId/respond').patch(respondToSwapRequest);
router.route('/swap-requests/:requestId/complete').patch(completeSwap);

// Admin only routes
router.use(restrictTo('admin'));
router.route('/admin/stats').get(getItemStats);

export default router;
