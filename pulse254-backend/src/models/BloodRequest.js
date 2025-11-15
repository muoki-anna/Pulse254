import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospitalName: {
      type: String,
      required: [true, 'Hospital name is required'],
    },
    bloodType: {
      type: String,
      required: [true, 'Blood type is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    unitsNeeded: {
      type: Number,
      required: [true, 'Units needed is required'],
      min: [1, 'At least 1 unit is required'],
    },
    urgency: {
      type: String,
      required: [true, 'Urgency level is required'],
      enum: ['Critical', 'High', 'Moderate'],
      default: 'Moderate',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    distance: {
      type: String,
      default: 'N/A',
    },
    deadline: {
      type: String,
      required: [true, 'Deadline is required'],
    },
    contact: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'fulfilled', 'cancelled', 'expired'],
      default: 'active',
    },
    unitsFulfilled: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
bloodRequestSchema.index({ hospital: 1, status: 1 });
bloodRequestSchema.index({ bloodType: 1, urgency: 1 });
bloodRequestSchema.index({ status: 1, createdAt: -1 });

// Virtual for progress percentage
bloodRequestSchema.virtual('progressPercentage').get(function () {
  return Math.round((this.unitsFulfilled / this.unitsNeeded) * 100);
});

// Method to check if request is still active
bloodRequestSchema.methods.isActive = function () {
  return this.status === 'active';
};

// Static method to get active requests
bloodRequestSchema.statics.getActiveRequests = function () {
  return this.find({ status: 'active' }).sort({ urgency: -1, createdAt: -1 });
};

// Update status if units fulfilled
bloodRequestSchema.pre('save', function (next) {
  if (this.unitsFulfilled >= this.unitsNeeded && this.status === 'active') {
    this.status = 'fulfilled';
  }
  next();
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

export default BloodRequest;