import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An item must have a title'],
  },
  description: {
    type: String,
    required: [true, 'An item must have a description'],
  },
  category: {
    type: String,
    required: true,
  },
  type: String, // e.g., shirt, jeans, etc.
  size: String,
  condition: String,
  tags: [String],
  images: [String], // URLs or paths to uploaded images
  status: {
    type: String,
    enum: ['available', 'swapped', 'pending'],
    default: 'available',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Item must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
