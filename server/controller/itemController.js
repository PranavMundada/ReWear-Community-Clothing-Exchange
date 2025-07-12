import Item from '../models/itemModel.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

export const getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find().populate('owner', 'name email');

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

export const getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('owner', 'name email');

  if (!item) return next(new AppError('No item found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

export const deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) return next(new AppError('No item found with that ID', 404));
  if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete this item.', 403));
  }

  await item.remove();

  res.status(204).json({ status: 'success', data: null });
});
