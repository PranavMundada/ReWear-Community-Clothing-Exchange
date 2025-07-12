import express from 'express';
import {
  requestSwap,
  respondToSwap,
  markItemSwapped,
} from '../controller/swapController.js';
import { protect } from '../controller/authController.js';

const router = express.Router();

router.use(protect);

router.post('/request', requestSwap);
router.patch('/respond/:swapId', respondToSwap);
router.patch('/mark-swapped/:itemId', markItemSwapped);

export default router;
