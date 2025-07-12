import Item from '../models/itemModel.js';
import User from '../models/userModel.js';
import SwapRequest from '../models/swapRequestModel.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import APIFeatures from '../utils/APIFeatures.js';

// Create a new item
export const createItem = catchAsync(async (req, res, next) => {
  // Add owner from authenticated user
  const itemData = {
    ...req.body,
    owner: req.user._id,
  };

  const newItem = await Item.create(itemData);
  
  // Update user's item count
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { 'statistics.itemsListed': 1 }
  });

  res.status(201).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

// Get all items with advanced filtering and pagination
export const getAllItems = catchAsync(async (req, res, next) => {
  // Build the query
  let query = Item.find({ status: 'available' });

  // Apply API features (filtering, sorting, field limiting, pagination)
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Add text search if provided
  if (req.query.search) {
    features.query = features.query.find({
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } },
        { brand: { $regex: req.query.search, $options: 'i' } },
      ],
    });
  }

  // Location-based filtering
  if (req.query.city || req.query.state) {
    const locationFilter = {};
    if (req.query.city) locationFilter['location.city'] = new RegExp(req.query.city, 'i');
    if (req.query.state) locationFilter['location.state'] = new RegExp(req.query.state, 'i');
    features.query = features.query.find(locationFilter);
  }

  // Points range filtering
  if (req.query.minPoints || req.query.maxPoints) {
    const pointsFilter = {};
    if (req.query.minPoints) pointsFilter.$gte = parseInt(req.query.minPoints);
    if (req.query.maxPoints) pointsFilter.$lte = parseInt(req.query.maxPoints);
    features.query = features.query.find({ pointsValue: pointsFilter });
  }

  // Execute query with population
  const items = await features.query.populate({
    path: 'owner',
    select: 'name photo statistics.rating'
  });

  // Get total count for pagination
  const totalItems = await Item.countDocuments({ status: 'available' });

  res.status(200).json({
    status: 'success',
    results: items.length,
    totalItems,
    data: {
      items,
    },
  });
});

// Get a single item by ID
export const getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate({
      path: 'owner',
      select: 'name photo statistics profile.location'
    })
    .populate({
      path: 'swapRequests',
      match: { status: { $in: ['pending', 'accepted'] } },
      populate: {
        path: 'requester',
        select: 'name photo'
      }
    });

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  // Increment view count (but not for the owner)
  if (req.user && item.owner._id.toString() !== req.user._id.toString()) {
    await Item.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    });
  }

  // Get similar items
  const similarItems = await Item.findSimilar(item._id, item.category, item.size);

  res.status(200).json({
    status: 'success',
    data: {
      item,
      similarItems,
    },
  });
});

// Update an item (only by owner or admin)
export const updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  // Check if user owns the item or is admin
  if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update this item', 403));
  }

  // Don't allow updating if item is in an active swap
  if (item.status === 'pending' || item.status === 'reserved') {
    return next(new AppError('Cannot update item while it is in an active swap', 400));
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      item: updatedItem,
    },
  });
});

// Delete an item (only by owner or admin)
export const deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  // Check if user owns the item or is admin
  if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete this item', 403));
  }

  // Don't allow deletion if item is in an active swap
  if (item.status === 'pending' || item.status === 'reserved') {
    return next(new AppError('Cannot delete item while it is in an active swap', 400));
  }

  await Item.findByIdAndDelete(req.params.id);

  // Update user's item count
  await User.findByIdAndUpdate(item.owner, {
    $inc: { 'statistics.itemsListed': -1 }
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get user's own items
export const getMyItems = catchAsync(async (req, res, next) => {
  const query = Item.find({ owner: req.user._id });
  
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const items = await features.query;

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

// Get items by category with stats
export const getItemsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  
  const items = await Item.find({ 
    category, 
    status: 'available' 
  })
  .populate('owner', 'name photo')
  .sort('-createdAt')
  .limit(20);

  // Get category statistics
  const stats = await Item.aggregate([
    {
      $match: { category, status: 'available' }
    },
    {
      $group: {
        _id: null,
        totalItems: { $sum: 1 },
        avgPoints: { $avg: '$pointsValue' },
        conditions: { $push: '$condition' },
        sizes: { $push: '$size' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      items,
      stats: stats[0] || {},
    },
  });
});

// Toggle favorite item
export const toggleFavorite = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  const user = await User.findById(req.user._id);
  const favorites = user.favorites || [];
  const itemIndex = favorites.indexOf(req.params.id);

  let action;
  if (itemIndex > -1) {
    // Remove from favorites
    favorites.splice(itemIndex, 1);
    await Item.findByIdAndUpdate(req.params.id, { $inc: { favorited: -1 } });
    action = 'removed';
  } else {
    // Add to favorites
    favorites.push(req.params.id);
    await Item.findByIdAndUpdate(req.params.id, { $inc: { favorited: 1 } });
    action = 'added';
  }

  await User.findByIdAndUpdate(req.user._id, { favorites });

  res.status(200).json({
    status: 'success',
    data: {
      action,
      favorited: action === 'added',
    },
  });
});

// Get user's favorite items
export const getFavoriteItems = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'favorites',
    populate: {
      path: 'owner',
      select: 'name photo'
    }
  });

  res.status(200).json({
    status: 'success',
    results: user.favorites?.length || 0,
    data: {
      items: user.favorites || [],
    },
  });
});

// Create a swap request
export const createSwapRequest = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { swapType, offeredItemId, pointsOffered, message } = req.body;

  const requestedItem = await Item.findById(itemId);
  if (!requestedItem) {
    return next(new AppError('Item not found', 404));
  }

  if (requestedItem.status !== 'available') {
    return next(new AppError('This item is no longer available for swap', 400));
  }

  if (requestedItem.owner.toString() === req.user._id.toString()) {
    return next(new AppError('You cannot request to swap your own item', 400));
  }

  // Check if user already has a pending request for this item
  const existingRequest = await SwapRequest.findOne({
    requester: req.user._id,
    requestedItem: itemId,
    status: 'pending'
  });

  if (existingRequest) {
    return next(new AppError('You already have a pending request for this item', 400));
  }

  let swapRequestData = {
    requester: req.user._id,
    itemOwner: requestedItem.owner,
    requestedItem: itemId,
    swapType,
    message
  };

  if (swapType === 'item-for-item') {
    if (!offeredItemId) {
      return next(new AppError('Please specify the item you want to offer', 400));
    }

    const offeredItem = await Item.findById(offeredItemId);
    if (!offeredItem) {
      return next(new AppError('Offered item not found', 404));
    }

    if (offeredItem.owner.toString() !== req.user._id.toString()) {
      return next(new AppError('You can only offer items that you own', 400));
    }

    if (offeredItem.status !== 'available') {
      return next(new AppError('Your offered item is not available', 400));
    }

    swapRequestData.offeredItem = offeredItemId;
  } else if (swapType === 'points-for-item') {
    if (!pointsOffered || pointsOffered < 1) {
      return next(new AppError('Please specify valid points amount', 400));
    }

    if (req.user.points < pointsOffered) {
      return next(new AppError('Insufficient points', 400));
    }

    if (pointsOffered < requestedItem.pointsValue * 0.8) {
      return next(new AppError(`Minimum ${Math.ceil(requestedItem.pointsValue * 0.8)} points required`, 400));
    }

    swapRequestData.pointsOffered = pointsOffered;
  }

  const swapRequest = await SwapRequest.create(swapRequestData);
  
  await swapRequest.populate([
    { path: 'requester', select: 'name photo' },
    { path: 'requestedItem', select: 'title images' },
    { path: 'offeredItem', select: 'title images' }
  ]);

  res.status(201).json({
    status: 'success',
    data: {
      swapRequest,
    },
  });
});

// Get swap requests for user's items
export const getReceivedSwapRequests = catchAsync(async (req, res, next) => {
  const swapRequests = await SwapRequest.find({
    itemOwner: req.user._id,
    status: { $in: ['pending', 'accepted'] }
  })
  .populate('requester', 'name photo statistics.rating')
  .populate('requestedItem', 'title images pointsValue')
  .populate('offeredItem', 'title images pointsValue')
  .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: swapRequests.length,
    data: {
      swapRequests,
    },
  });
});

// Get swap requests made by user
export const getSentSwapRequests = catchAsync(async (req, res, next) => {
  const swapRequests = await SwapRequest.find({
    requester: req.user._id
  })
  .populate('itemOwner', 'name photo statistics.rating')
  .populate('requestedItem', 'title images pointsValue')
  .populate('offeredItem', 'title images pointsValue')
  .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: swapRequests.length,
    data: {
      swapRequests,
    },
  });
});

// Respond to a swap request (accept/decline)
export const respondToSwapRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const { action, responseMessage } = req.body; // action: 'accept' or 'decline'

  const swapRequest = await SwapRequest.findById(requestId);
  
  if (!swapRequest) {
    return next(new AppError('Swap request not found', 404));
  }

  if (swapRequest.itemOwner.toString() !== req.user._id.toString()) {
    return next(new AppError('You can only respond to requests for your items', 403));
  }

  if (swapRequest.status !== 'pending') {
    return next(new AppError('This request has already been responded to', 400));
  }

  if (!swapRequest.canBeAccepted()) {
    return next(new AppError('This request has expired', 400));
  }

  swapRequest.status = action === 'accept' ? 'accepted' : 'declined';
  swapRequest.responseMessage = responseMessage;
  
  await swapRequest.save();

  // If accepted, decline all other pending requests for the same item
  if (action === 'accept') {
    await SwapRequest.updateMany(
      {
        requestedItem: swapRequest.requestedItem,
        _id: { $ne: requestId },
        status: 'pending'
      },
      {
        status: 'declined',
        responseMessage: 'Item no longer available'
      }
    );
  }

  await swapRequest.populate([
    { path: 'requester', select: 'name photo' },
    { path: 'requestedItem', select: 'title images' },
    { path: 'offeredItem', select: 'title images' }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      swapRequest,
    },
  });
});

// Mark swap as completed
export const completeSwap = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const { rating, review } = req.body;

  const swapRequest = await SwapRequest.findById(requestId);
  
  if (!swapRequest) {
    return next(new AppError('Swap request not found', 404));
  }

  const isRequester = swapRequest.requester.toString() === req.user._id.toString();
  const isOwner = swapRequest.itemOwner.toString() === req.user._id.toString();

  if (!isRequester && !isOwner) {
    return next(new AppError('You are not part of this swap', 403));
  }

  if (swapRequest.status !== 'accepted') {
    return next(new AppError('Only accepted swaps can be completed', 400));
  }

  // Update swap to completed
  swapRequest.status = 'completed';
  await swapRequest.save();

  // Update user statistics
  await User.findByIdAndUpdate(swapRequest.requester, {
    $inc: { 
      'statistics.totalSwaps': 1,
      'statistics.successfulSwaps': 1
    }
  });

  await User.findByIdAndUpdate(swapRequest.itemOwner, {
    $inc: { 
      'statistics.totalSwaps': 1,
      'statistics.successfulSwaps': 1
    }
  });

  // Add rating if provided
  if (rating && (rating >= 1 && rating <= 5)) {
    const ratedUser = isRequester ? swapRequest.itemOwner : swapRequest.requester;
    await User.findById(ratedUser).then(user => user.updateRating(rating));
  }

  res.status(200).json({
    status: 'success',
    data: {
      swapRequest,
    },
  });
});

// Get item statistics for admin
export const getItemStats = catchAsync(async (req, res, next) => {
  const stats = await Item.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgPoints: { $avg: '$pointsValue' },
        totalViews: { $sum: '$views' },
        conditions: { $push: '$condition' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  const statusStats = await Item.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      categoryStats: stats,
      statusStats,
    },
  });
});
