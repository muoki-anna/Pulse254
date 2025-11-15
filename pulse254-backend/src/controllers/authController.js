import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

// @desc    Register a new hospital
// @route   POST /api/auth/hospital/register
// @access  Public
export const registerHospital = async (req, res) => {
  try {
    const { hospitalName, email, password, contactPhone, location, address } =
      req.body;

    // Check if hospital already exists
    const existingHospital = await User.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message: 'A hospital with this email already exists',
      });
    }

    // Create new hospital user
    const hospital = await User.create({
      hospitalName,
      email,
      password,
      contactPhone,
      location,
      address,
      role: 'hospital',
    });

    // Generate JWT token
    const token = generateToken(hospital._id);

    res.status(201).json({
      success: true,
      message: 'Hospital registered successfully',
      token,
      user: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        contactPhone: hospital.contactPhone,
        location: hospital.location,
        role: hospital.role,
      },
    });
  } catch (error) {
    console.error('Register Hospital Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// @desc    Login hospital
// @route   POST /api/auth/hospital/login
// @access  Public
export const loginHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find hospital and include password
    const hospital = await User.findOne({ email }).select('+password');

    if (!hospital) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if account is active
    if (!hospital.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Check password
    const isPasswordValid = await hospital.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken(hospital._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        contactPhone: hospital.contactPhone,
        location: hospital.location,
        role: hospital.role,
        isVerified: hospital.isVerified,
      },
    });
  } catch (error) {
    console.error('Login Hospital Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Get current logged in hospital
// @route   GET /api/auth/hospital/me
// @access  Private
export const getCurrentHospital = async (req, res) => {
  try {
    const hospital = await User.findById(req.user._id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    res.status(200).json({
      success: true,
      user: hospital,
    });
  } catch (error) {
    console.error('Get Current Hospital Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update hospital profile
// @route   PUT /api/auth/hospital/profile
// @access  Private
export const updateHospitalProfile = async (req, res) => {
  try {
    const { hospitalName, contactPhone, location, address } = req.body;

    const hospital = await User.findById(req.user._id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    // Update fields
    if (hospitalName) hospital.hospitalName = hospitalName;
    if (contactPhone) hospital.contactPhone = contactPhone;
    if (location) hospital.location = location;
    if (address) hospital.address = address;

    await hospital.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: hospital,
    });
  } catch (error) {
    console.error('Update Hospital Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Change hospital password
// @route   PUT /api/auth/hospital/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const hospital = await User.findById(req.user._id).select('+password');

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    // Verify current password
    const isPasswordValid = await hospital.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    hospital.password = newPassword;
    await hospital.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};