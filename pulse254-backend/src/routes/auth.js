import express from 'express';
import {
  registerHospital,
  loginHospital,
  getCurrentHospital,
  updateHospitalProfile,
  changePassword,
} from '../controllers/authController.js';
import { protect, isHospital } from '../middleware/auth.js';
import {
  validateHospitalRegistration,
  validateHospitalLogin,
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/hospital/register', validateHospitalRegistration, registerHospital);
router.post('/hospital/login', validateHospitalLogin, loginHospital);

// Protected routes (require authentication)
router.get('/hospital/me', protect, isHospital, getCurrentHospital);
router.put('/hospital/profile', protect, isHospital, updateHospitalProfile);
router.put('/hospital/password', protect, isHospital, changePassword);

export default router;