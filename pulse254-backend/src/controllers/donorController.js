// controllers/donorController.js
import Donor from '../models/Donor.js';

// @desc    Register new donor
// @route   POST /api/donors/register
// @access  Public
export const registerDonor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      bloodType,
      age,
      weight,
      address,
      city,
      idNumber,
      hasDonatedBefore,
      lastDonationDate,
      healthConditions
    } = req.body;

    // Check if donor already exists with email or ID
    const existingDonor = await Donor.findOne({
      $or: [{ email }, { idNumber }]
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: 'Donor already registered',
        errors: [
          {
            field: existingDonor.email === email ? 'email' : 'idNumber',
            message: `${existingDonor.email === email ? 'Email' : 'ID number'} already exists`
          }
        ]
      });
    }

    // Create new donor
    const donor = await Donor.create({
      fullName,
      email,
      phone,
      bloodType,
      age,
      weight,
      address,
      city,
      idNumber,
      hasDonatedBefore: hasDonatedBefore === 'true' || hasDonatedBefore === true,
      lastDonationDate: hasDonatedBefore ? lastDonationDate : null,
      healthConditions: healthConditions || ''
    });


    res.status(201).json({
      success: true,
      message: 'Donor registered successfully',
      data: {
        donor: {
          _id: donor._id,
          fullName: donor.fullName,
          email: donor.email,
          bloodType: donor.bloodType,
          city: donor.city,
          isActive: donor.isActive,
          availability: donor.availability
        }
      }
    });

  } catch (error) {
    console.error('Donor registration error:', error);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry',
        errors: [{
          field,
          message: `${field} already exists`
        }]
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all donors (for admin/hospital use)
// @route   GET /api/donors
// @access  Private (Hospital/Admin)
export const getDonors = async (req, res) => {
  try {
    const { bloodType, city, page = 1, limit = 10 } = req.query;
    
    const query = { isActive: true };
    
    if (bloodType) query.bloodType = bloodType;
    if (city) query.city = new RegExp(city, 'i');

    const donors = await Donor.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donor.countDocuments(query);

    res.json({
      success: true,
      data: {
        donors,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get available donors by blood type
// @route   GET /api/donors/available/:bloodType
// @access  Private (Hospital)
export const getAvailableDonors = async (req, res) => {
  try {
    const { bloodType } = req.params;
    const { city } = req.query;

    const query = {
      bloodType,
      isActive: true,
      availability: 'available'
    };

    if (city) {
      query.city = new RegExp(city, 'i');
    }

    const donors = await Donor.find(query)
      .select('fullName phone email city bloodType lastDonationDate')
      .sort({ lastDonationDate: 1 }); // Prioritize those who haven't donated recently

    res.json({
      success: true,
      data: {
        donors,
        count: donors.length
      }
    });
  } catch (error) {
    console.error('Get available donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update donor availability
// @route   PUT /api/donors/:id/availability
// @access  Private (Donor - would need auth)
export const updateDonorAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      id,
      { availability },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    res.json({
      success: true,
      message: 'Availability updated successfully',
      data: { donor }
    });
  } catch (error) {
    console.error('Update donor availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get donor stats
// @route   GET /api/donors/stats
// @access  Private (Admin/Hospital)
export const getDonorStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments({ isActive: true });
    const availableDonors = await Donor.countDocuments({ 
      isActive: true, 
      availability: 'available' 
    });
    
    const bloodTypeStats = await Donor.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$bloodType',
          count: { $sum: 1 }
        }
      }
    ]);

    const cityStats = await Donor.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        totalDonors,
        availableDonors,
        bloodTypeStats,
        topCities: cityStats
      }
    });
  } catch (error) {
    console.error('Get donor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};