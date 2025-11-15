// models/Appointment.js - FIXED VERSION
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    bloodRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodRequest',
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // REMOVED: required: true - This allows public appointments
    },
    hospitalName: {
      type: String,
      required: true,
    },
    donorInfo: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
      },
      bloodType: {
        type: String,
        required: [true, 'Blood type is required'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
      idNumber: {
        type: String,
        required: [true, 'ID/Passport number is required'],
        trim: true,
      },
    },
    appointmentDetails: {
      date: {
        type: Date,
        required: [true, 'Appointment date is required'],
      },
      time: {
        type: String,
        required: [true, 'Appointment time is required'],
      },
      medicalConditions: {
        type: String,
        default: 'None',
        maxlength: [1000, 'Medical conditions cannot exceed 1000 characters'],
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    completedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
appointmentSchema.index({ hospital: 1, status: 1 });
appointmentSchema.index({ bloodRequest: 1 });
appointmentSchema.index({ 'donorInfo.email': 1 });
appointmentSchema.index({ 'appointmentDetails.date': 1 });

// Virtual for full appointment datetime
appointmentSchema.virtual('appointmentDateTime').get(function () {
  if (this.appointmentDetails.date && this.appointmentDetails.time) {
    const [hours, minutes] = this.appointmentDetails.time.split(':');
    const date = new Date(this.appointmentDetails.date);
    date.setHours(parseInt(hours), parseInt(minutes));
    return date;
  }
  return null;
});

// Method to check if appointment is upcoming
appointmentSchema.methods.isUpcoming = function () {
  const now = new Date();
  const appointmentDate = this.appointmentDateTime;
  return appointmentDate && appointmentDate > now && this.status === 'confirmed';
};

// Static method to get upcoming appointments
appointmentSchema.statics.getUpcomingAppointments = function (hospitalId) {
  const now = new Date();
  return this.find({
    hospital: hospitalId,
    status: { $in: ['pending', 'confirmed'] },
    'appointmentDetails.date': { $gte: now },
  }).sort({ 'appointmentDetails.date': 1 });
};

// Update completedAt when status changes to completed
appointmentSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'completed' && !this.completedAt) {
      this.completedAt = new Date();
    }
    if (this.status === 'cancelled' && !this.cancelledAt) {
      this.cancelledAt = new Date();
    }
  }
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;