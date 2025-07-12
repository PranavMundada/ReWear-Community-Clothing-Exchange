import SwapRequest from '../models/swapRequestModel.js';
import Item from '../models/itemModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

// Send swap request
export const requestSwap = catchAsync(async (req, res, next) => {
  const { itemId } = req.body;

  const swap = await SwapRequest.create({
    requester: req.user._id,
    item: itemId,
  });

  res.status(201).json({ status: 'success', data: { swap } });
});

// Approve or Decline
export const respondToSwap = catchAsync(async (req, res, next) => {
  const { swapId } = req.params;
  const { action } = req.body; // 'approved' or 'declined'

  if (!['approved', 'declined'].includes(action)) {
    return next(new AppError('Invalid action', 400));
  }

  const swap = await SwapRequest.findById(swapId).populate('item');

  if (!swap) return next(new AppError('Swap not found', 404));

  // Check if current user owns the item
  if (String(swap.item.owner) !== String(req.user._id)) {
    return next(new AppError('Unauthorized', 403));
  }

  swap.status = action;
  await swap.save();

  res.status(200).json({ status: 'success', data: { swap } });
});

// Mark item as swapped
export const markItemSwapped = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  const item = await Item.findById(itemId);

  if (!item) return next(new AppError('Item not found', 404));
  if (String(item.uploader) !== String(req.user._id)) {
    return next(new AppError('Unauthorized', 403));
  }

  item.status = 'swapped';
  await item.save();

  res.status(200).json({ status: 'success', message: 'Item marked as swapped' });
});
