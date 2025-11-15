// models/Donor.js
import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please provide a valid phone number']
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Invalid blood type'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Must be at least 18 years old'],
    max: [65, 'Must be under 65 years old']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [50, 'Weight must be at least 50kg']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  idNumber: {
    type: String,
    required: [true, 'ID/Passport number is required'],
    unique: true,
    trim: true
  },
  hasDonatedBefore: {
    type: Boolean,
    default: false
  },
  lastDonationDate: {
    type: Date
  },
  healthConditions: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable', 'temporarily_unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Index for better query performance
donorSchema.index({ bloodType: 1, isActive: 1, availability: 1 });
donorSchema.index({ email: 1 }, { unique: true });
donorSchema.index({ idNumber: 1 }, { unique: true });

// Static method to find available donors by blood type
donorSchema.statics.findAvailableByBloodType = function(bloodType) {
  return this.find({
    bloodType,
    isActive: true,
    availability: 'available'
  });
};

// Instance method to check if donor is eligible
donorSchema.methods.isEligible = function() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return this.isActive && 
         this.availability === 'available' &&
         (!this.lastDonationDate || this.lastDonationDate < threeMonthsAgo);
};

export default mongoose.model('Donor', donorSchema);