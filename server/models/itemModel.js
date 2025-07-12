import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An item must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'An item must have a description'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: {
      values: ['clothing', 'shoes', 'accessories', 'bags', 'jewelry', 'electronics', 'books', 'home', 'other'],
      message: 'Category must be one of: clothing, shoes, accessories, bags, jewelry, electronics, books, home, other'
    }
  },
  type: {
    type: String,
    required: [true, 'Please specify the item type']
  }, // e.g., shirt, jeans, sneakers, etc.
  size: {
    type: String,
    enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Other']
  },
  condition: {
    type: String,
    required: [true, 'Please specify the item condition'],
    enum: {
      values: ['new', 'like-new', 'good', 'fair', 'vintage'],
      message: 'Condition must be one of: new, like-new, good, fair, vintage'
    }
  },
  color: {
    type: String,
    required: [true, 'Please specify the color']
  },
  brand: String,
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  status: {
    type: String,
    enum: ['available', 'swapped', 'pending', 'reserved'],
    default: 'available'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Item must belong to a user']
  },
  pointsValue: {
    type: Number,
    default: function() {
      // Calculate points based on condition and category
      const conditionMultiplier = {
        'new': 1.0,
        'like-new': 0.9,
        'good': 0.7,
        'fair': 0.5,
        'vintage': 0.8
      };
      
      const categoryBasePoints = {
        'clothing': 50,
        'shoes': 60,
        'accessories': 30,
        'bags': 70,
        'jewelry': 40,
        'electronics': 100,
        'books': 20,
        'home': 80,
        'other': 30
      };
      
      return Math.round(
        (categoryBasePoints[this.category] || 30) * 
        (conditionMultiplier[this.condition] || 0.5)
      );
    }
  },
  swapPreferences: {
    lookingFor: [{
      category: String,
      size: String,
      description: String
    }],
    acceptsPoints: {
      type: Boolean,
      default: true
    }
  },
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'US'
    }
  },
  views: {
    type: Number,
    default: 0
  },
  favorited: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ owner: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ pointsValue: 1 });
itemSchema.index({ 'location.city': 1, 'location.state': 1 });
itemSchema.index({ tags: 1 });

// Virtual populate for swap requests
itemSchema.virtual('swapRequests', {
  ref: 'SwapRequest',
  foreignField: 'requestedItem',
  localField: '_id'
});

// Pre-save middleware to update timestamps
itemSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Instance method to check if item can be swapped
itemSchema.methods.canBeSwapped = function() {
  return this.status === 'available' && this.images.length > 0;
};

// Static method to find similar items
itemSchema.statics.findSimilar = function(itemId, category, size) {
  return this.find({
    _id: { $ne: itemId },
    category,
    size,
    status: 'available'
  }).limit(6);
};

const Item = mongoose.model('Item', itemSchema);
export default Item;
