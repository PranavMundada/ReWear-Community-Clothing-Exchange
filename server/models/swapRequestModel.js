import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
export default SwapRequest;
