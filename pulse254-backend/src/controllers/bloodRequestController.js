import BloodRequest from '../models/BloodRequest.js';

// @desc    Get all blood requests (Public)
// @route   GET /api/blood-requests
// @access  Public
export const getAllBloodRequests = async (req, res) => {
  try {
    const { bloodType, urgency, status } = req.query;

    // Build filter
    const filter = {};
    if (bloodType) filter.bloodType = bloodType;
    if (urgency) filter.urgency = urgency;
    if (status) filter.status = status;
    else filter.status = 'active'; // Default to active requests

    const bloodRequests = await BloodRequest.find(filter)
      .populate('hospital', 'hospitalName email contactPhone location')
      .sort({ urgency: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bloodRequests.length,
      data: bloodRequests,
    });
  } catch (error) {
    console.error('Get All Blood Requests Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single blood request (Public)
// @route   GET /api/blood-requests/:id
// @access  Public
export const getBloodRequestById = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id).populate(
      'hospital',
      'hospitalName email contactPhone location address'
    );

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found',
      });
    }

    res.status(200).json({
      success: true,
      data: bloodRequest,
    });
  } catch (error) {
    console.error('Get Blood Request By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create blood request (Public - no login required)
// @route   POST /api/blood-requests/public
// @access  Public
export const createPublicBloodRequest = async (req, res) => {
  try {
    const {
      hospitalName,
      bloodType,
      unitsNeeded,
      urgency,
      location,
      distance,
      deadline,
      contact,
      description,
    } = req.body;

    // Validate required fields
    if (!hospitalName || !bloodType || !unitsNeeded || !urgency || !location || !contact) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: hospitalName, bloodType, unitsNeeded, urgency, location, contact',
      });
    }

    const bloodRequest = await BloodRequest.create({
      hospital: null, // Since no user is logged in
      hospitalName,
      bloodType,
      unitsNeeded,
      urgency,
      location,
      distance,
      deadline,
      contact,
      description,
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: bloodRequest,
    });
  } catch (error) {
    console.error('Create Public Blood Request Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create blood request (Hospital only - with authentication)
// @route   POST /api/blood-requests
// @access  Private (Hospital)
export const createBloodRequest = async (req, res) => {
  try {
    const {
      bloodType,
      unitsNeeded,
      urgency,
      location,
      distance,
      deadline,
      contact,
      description,
    } = req.body;

    const bloodRequest = await BloodRequest.create({
      hospital: req.user._id,
      hospitalName: req.user.hospitalName,
      bloodType,
      unitsNeeded,
      urgency,
      location: location || req.user.location,
      distance,
      deadline,
      contact: contact || req.user.contactPhone,
      description,
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: bloodRequest,
    });
  } catch (error) {
    console.error('Create Blood Request Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update blood request (Hospital only - own requests)
// @route   PUT /api/blood-requests/:id
// @access  Private (Hospital)
export const updateBloodRequest = async (req, res) => {
  try {
    let bloodRequest = await BloodRequest.findById(req.params.id);

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found',
      });
    }

    // Check ownership (only for authenticated hospital requests)
    if (bloodRequest.hospital && bloodRequest.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blood request',
      });
    }

    // Update fields
    const allowedUpdates = [
      'bloodType',
      'unitsNeeded',
      'urgency',
      'location',
      'distance',
      'deadline',
      'contact',
      'description',
      'status',
      'unitsFulfilled',
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        bloodRequest[field] = req.body[field];
      }
    });

    await bloodRequest.save();

    res.status(200).json({
      success: true,
      message: 'Blood request updated successfully',
      data: bloodRequest,
    });
  } catch (error) {
    console.error('Update Blood Request Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete blood request (Hospital only - own requests)
// @route   DELETE /api/blood-requests/:id
// @access  Private (Hospital)
export const deleteBloodRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id);

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found',
      });
    }

    // Check ownership (only for authenticated hospital requests)
    if (bloodRequest.hospital && bloodRequest.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blood request',
      });
    }

    await bloodRequest.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blood request deleted successfully',
    });
  } catch (error) {
    console.error('Delete Blood Request Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get hospital's own blood requests
// @route   GET /api/blood-requests/hospital/my-requests
// @access  Private (Hospital)
export const getMyBloodRequests = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = { hospital: req.user._id };
    if (status) filter.status = status;

    const bloodRequests = await BloodRequest.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bloodRequests.length,
      data: bloodRequests,
    });
  } catch (error) {
    console.error('Get My Blood Requests Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get blood requests statistics
// @route   GET /api/blood-requests/stats
// @access  Public
export const getBloodRequestStats = async (req, res) => {
  try {
    const stats = await BloodRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalUnitsNeeded: { $sum: '$unitsNeeded' },
        },
      },
    ]);

    const urgencyStats = await BloodRequest.aggregate([
      {
        $match: { status: 'active' },
      },
      {
        $group: {
          _id: '$urgency',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        byUrgency: urgencyStats,
      },
    });
  } catch (error) {
    console.error('Get Blood Request Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};