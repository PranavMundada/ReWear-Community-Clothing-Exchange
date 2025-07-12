import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please tell your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  points: {
    type: Number,
    default: 100, // Starting points for new users
    min: [0, 'Points cannot be negative']
  },
  profile: {
    bio: {
      type: String,
      maxlength: [300, 'Bio cannot exceed 300 characters'],
      trim: true
    },
    location: {
      city: String,
      state: String,
      country: {
        type: String,
        default: 'US'
      }
    },
    preferences: {
      categories: [{
        type: String,
        enum: ['clothing', 'shoes', 'accessories', 'bags', 'jewelry', 'electronics', 'books', 'home', 'other']
      }],
      sizes: [{
        type: String,
        enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Other']
      }],
      maxShippingDistance: {
        type: Number,
        default: 100 // miles
      }
    },
    social: {
      instagram: String,
      facebook: String,
      website: String
    }
  },
  statistics: {
    totalSwaps: {
      type: Number,
      default: 0
    },
    successfulSwaps: {
      type: Number,
      default: 0
    },
    itemsListed: {
      type: Number,
      default: 0
    },
    pointsEarned: {
      type: Number,
      default: 0
    },
    pointsSpent: {
      type: Number,
      default: 0
    },
    rating: {
      average: {
        type: Number,
        default: 5.0,
        min: 1,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  settings: {
    notifications: {
      email: {
        newSwapRequest: { type: Boolean, default: true },
        swapAccepted: { type: Boolean, default: true },
        swapCompleted: { type: Boolean, default: true },
        newMessage: { type: Boolean, default: true },
        promotions: { type: Boolean, default: false }
      },
      push: {
        newSwapRequest: { type: Boolean, default: true },
        swapAccepted: { type: Boolean, default: true },
        swapCompleted: { type: Boolean, default: true },
        newMessage: { type: Boolean, default: true }
      }
    },
    privacy: {
      showLocation: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      showSocial: { type: Boolean, default: true }
    }
  },
  verification: {
    email: {
      verified: { type: Boolean, default: false },
      token: String,
      expires: Date
    },
    phone: {
      verified: { type: Boolean, default: false },
      number: String,
      token: String,
      expires: Date
    },
    identity: {
      verified: { type: Boolean, default: false },
      documents: [String] // Store document URLs
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'profile.location.city': 1, 'profile.location.state': 1 });
userSchema.index({ points: -1 });
userSchema.index({ 'statistics.rating.average': -1 });

// Virtual populate for user's items
userSchema.virtual('items', {
  ref: 'Item',
  foreignField: 'owner',
  localField: '_id'
});

// Virtual populate for swap requests
userSchema.virtual('sentSwapRequests', {
  ref: 'SwapRequest',
  foreignField: 'requester',
  localField: '_id'
});

userSchema.virtual('receivedSwapRequests', {
  ref: 'SwapRequest',
  foreignField: 'itemOwner',
  localField: '_id'
});

// Virtual for user level based on points
userSchema.virtual('level').get(function() {
  const points = this.points;
  if (points < 100) return { name: 'Newbie', icon: '🌱' };
  if (points < 500) return { name: 'Swapper', icon: '🔄' };
  if (points < 1000) return { name: 'Trader', icon: '💼' };
  if (points < 2500) return { name: 'Expert', icon: '⭐' };
  if (points < 5000) return { name: 'Master', icon: '👑' };
  return { name: 'Legend', icon: '🏆' };
});

// Pre-save middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();
  
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance methods
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.addPoints = function(amount, reason = 'Manual adjustment') {
  this.points += amount;
  this.statistics.pointsEarned += amount;
  return this.save();
};

userSchema.methods.deductPoints = function(amount, reason = 'Manual adjustment') {
  if (this.points < amount) {
    throw new Error('Insufficient points');
  }
  this.points -= amount;
  this.statistics.pointsSpent += amount;
  return this.save();
};

userSchema.methods.canAfford = function(amount) {
  return this.points >= amount;
};

userSchema.methods.updateRating = async function(newRating) {
  const currentCount = this.statistics.rating.count;
  const currentAverage = this.statistics.rating.average;
  
  const newCount = currentCount + 1;
  const newAverage = ((currentAverage * currentCount) + newRating) / newCount;
  
  this.statistics.rating.count = newCount;
  this.statistics.rating.average = Math.round(newAverage * 10) / 10;
  
  return this.save();
};

// Static methods
userSchema.statics.getTopSwappers = function(limit = 10) {
  return this.find({ active: true })
    .sort({ 'statistics.successfulSwaps': -1 })
    .limit(limit)
    .select('name photo statistics.successfulSwaps statistics.rating');
};

userSchema.statics.getTopByPoints = function(limit = 10) {
  return this.find({ active: true })
    .sort({ points: -1 })
    .limit(limit)
    .select('name photo points');
};

const User = mongoose.model("User", userSchema);
export default User;
