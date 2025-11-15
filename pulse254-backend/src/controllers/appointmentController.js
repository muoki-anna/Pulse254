import Appointment from '../models/Appointment.js';
import BloodRequest from '../models/BloodRequest.js';

// @desc    Book an appointment (Public - Donors)
// @route   POST /api/appointments
// @access  Public
export const bookAppointment = async (req, res) => {
  try {
    const {
      bloodRequestId,
      fullName,
      email,
      phone,
      bloodType,
      date,
      time,
      idNumber,
      medicalConditions,
    } = req.body;

    // Find blood request
    const bloodRequest = await BloodRequest.findById(bloodRequestId);

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found',
      });
    }

    // Check if blood request is active
    if (bloodRequest.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This blood request is no longer active',
      });
    }

    // Check if blood types match (optional but recommended)
    if (bloodRequest.bloodType !== bloodType) {
      return res.status(400).json({
        success: false,
        message: `Blood type mismatch. This request needs ${bloodRequest.bloodType} blood type`,
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      bloodRequest: bloodRequest._id,
      hospital: bloodRequest.hospital,
      hospitalName: bloodRequest.hospitalName,
      donorInfo: {
        fullName,
        email,
        phone,
        bloodType,
        idNumber,
      },
      appointmentDetails: {
        date,
        time,
        medicalConditions: medicalConditions || 'None',
      },
      status: 'pending',
    });

    // Populate the appointment
    await appointment.populate('bloodRequest');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully! The hospital will contact you soon.',
      appointment: appointment,
    });
  } catch (error) {
    console.error('Book Appointment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while booking appointment',
      error: error.message,
    });
  }
};

// @desc    Get appointment by ID (Public)
// @route   GET /api/appointments/:id
// @access  Public
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('bloodRequest')
      .populate('hospital', 'hospitalName email contactPhone location address');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Get Appointment By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all appointments for a hospital
// @route   GET /api/appointments/hospital/all
// @access  Private (Hospital)
export const getHospitalAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;

    // Build filter
    const filter = { hospital: req.user._id };
    if (status) filter.status = status;
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      filter['appointmentDetails.date'] = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('bloodRequest')
      .sort({ 'appointmentDetails.date': 1, 'appointmentDetails.time': 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Get Hospital Appointments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Hospital)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes, cancellationReason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Check ownership
    if (appointment.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment',
      });
    }

    // Update status
    if (status) {
      appointment.status = status;
    }

    if (notes) {
      appointment.notes = notes;
    }

    if (status === 'cancelled' && cancellationReason) {
      appointment.cancellationReason = cancellationReason;
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Update Appointment Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Cancel appointment (Hospital or Donor)
// @route   DELETE /api/appointments/:id
// @access  Public (with validation)
export const cancelAppointment = async (req, res) => {
  try {
    const { email, reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Verify email matches (for donor cancellation)
    if (email && appointment.donorInfo.email !== email) {
      return res.status(403).json({
        success: false,
        message: 'Email does not match appointment records',
      });
    }

    // Or check if it's the hospital cancelling
    if (req.user && appointment.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment',
      });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = reason || 'Cancelled by user';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel Appointment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get upcoming appointments
// @route   GET /api/appointments/hospital/upcoming
// @access  Private (Hospital)
export const getUpcomingAppointments = async (req, res) => {
  try {
    const now = new Date();
    
    const appointments = await Appointment.find({
      hospital: req.user._id,
      status: { $in: ['pending', 'confirmed'] },
      'appointmentDetails.date': { $gte: now },
    })
      .populate('bloodRequest')
      .sort({ 'appointmentDetails.date': 1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Get Upcoming Appointments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get appointment statistics for hospital
// @route   GET /api/appointments/hospital/stats
// @access  Private (Hospital)
export const getAppointmentStats = async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $match: { hospital: req.user._id },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Appointment.countDocuments({ hospital: req.user._id });

    const upcoming = await Appointment.countDocuments({
      hospital: req.user._id,
      status: { $in: ['pending', 'confirmed'] },
      'appointmentDetails.date': { $gte: new Date() },
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        upcoming,
        byStatus: stats,
      },
    });
  } catch (error) {
    console.error('Get Appointment Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};