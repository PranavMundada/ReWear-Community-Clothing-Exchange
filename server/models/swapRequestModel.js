import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Swap request must have a requester']
  },
  itemOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Swap request must have an item owner']
  },
  requestedItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: [true, 'Swap request must specify the requested item']
  },
  swapType: {
    type: String,
    enum: ['item-for-item', 'points-for-item'],
    required: [true, 'Please specify the swap type']
  },
  offeredItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: function() {
      return this.swapType === 'item-for-item';
    }
  },
  pointsOffered: {
    type: Number,
    required: function() {
      return this.swapType === 'points-for-item';
    },
    min: [1, 'Points offered must be at least 1']
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed', 'cancelled'],
    default: 'pending'
  },
  responseMessage: {
    type: String,
    maxlength: [500, 'Response message cannot exceed 500 characters'],
    trim: true
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Swap requests expire after 7 days
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
  },
  acceptedAt: Date,
  completedAt: Date,
  shippingInfo: {
    requesterAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'US' }
    },
    itemOwnerAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'US' }
    },
    trackingNumbers: {
      requesterToOwner: String,
      ownerToRequester: String
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ itemOwner: 1, status: 1 });
swapRequestSchema.index({ requestedItem: 1 });
swapRequestSchema.index({ status: 1, expiresAt: 1 });

// Pre-save middleware
swapRequestSchema.pre('save', async function(next) {
  if (this.isModified('status') && this.status === 'accepted') {
    this.acceptedAt = new Date();
    
    // Update item status to reserved
    await mongoose.model('Item').findByIdAndUpdate(
      this.requestedItem,
      { status: 'reserved' }
    );
    
    if (this.offeredItem) {
      await mongoose.model('Item').findByIdAndUpdate(
        this.offeredItem,
        { status: 'reserved' }
      );
    }
  }
  
  if (this.isModified('status') && this.status === 'completed') {
    this.completedAt = new Date();
    
    // Update item statuses to swapped and transfer ownership
    const requestedItem = await mongoose.model('Item').findById(this.requestedItem);
    const offeredItem = this.offeredItem ? await mongoose.model('Item').findById(this.offeredItem) : null;
    
    // Transfer ownership
    await mongoose.model('Item').findByIdAndUpdate(
      this.requestedItem,
      { 
        status: 'swapped',
        owner: this.requester
      }
    );
    
    if (offeredItem) {
      await mongoose.model('Item').findByIdAndUpdate(
        this.offeredItem,
        { 
          status: 'swapped',
          owner: this.itemOwner
        }
      );
    } else {
      // Points transaction
      await mongoose.model('User').findByIdAndUpdate(
        this.requester,
        { $inc: { points: -this.pointsOffered } }
      );
      
      await mongoose.model('User').findByIdAndUpdate(
        this.itemOwner,
        { $inc: { points: this.pointsOffered } }
      );
    }
  }
  
  if (this.isModified('status') && ['declined', 'cancelled'].includes(this.status)) {
    // Return items to available status
    await mongoose.model('Item').findByIdAndUpdate(
      this.requestedItem,
      { status: 'available' }
    );
    
    if (this.offeredItem) {
      await mongoose.model('Item').findByIdAndUpdate(
        this.offeredItem,
        { status: 'available' }
      );
    }
  }
  
  next();
});

// Instance methods
swapRequestSchema.methods.canBeAccepted = function() {
  return this.status === 'pending' && new Date() < this.expiresAt;
};

swapRequestSchema.methods.canBeCompleted = function() {
  return this.status === 'accepted';
};

// Static methods
swapRequestSchema.statics.findExpired = function() {
  return this.find({
    status: 'pending',
    expiresAt: { $lt: new Date() }
  });
};

swapRequestSchema.statics.getUserSwapStats = async function(userId) {
  const stats = await this.aggregate([
    {
      $match: {
        $or: [{ requester: userId }, { itemOwner: userId }]
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return stats.reduce((acc, stat) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {});
};

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
export default SwapRequest;
