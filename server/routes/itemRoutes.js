import express from 'express';
import {
  createItem,
  getAllItems,
  getItem,
  deleteItem,
} from '../controller/itemController.js';

import { protect ,restrictTo} from '../controller/authController.js';

const router = express.Router();

// Public route to fetch items
router.route('/').get(getAllItems);

// Protected routes
router.use(protect);
router.route('/').post(restrictTo("admin"),createItem);
router.route('/:id').get(getItem).delete(deleteItem);



export default router;
