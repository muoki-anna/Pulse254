import express from 'express';
import {
  bookAppointment,
  getAppointmentById,
  getHospitalAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getUpcomingAppointments,
  getAppointmentStats,
} from '../controllers/appointmentController.js';
import { protect, isHospital } from '../middleware/auth.js';
import {
  validateAppointment,
  validateMongoId,
} from '../middleware/validation.js';

const router = express.Router();

// IMPORTANT: Specific routes BEFORE parameterized routes
router.get('/hospital/all', protect, isHospital, getHospitalAppointments);
router.get('/hospital/upcoming', protect, isHospital, getUpcomingAppointments);
router.get('/hospital/stats', protect, isHospital, getAppointmentStats);

// Public routes (for donors)
router.post('/', validateAppointment, bookAppointment);
router.get('/:id', validateMongoId, getAppointmentById);

// Protected routes (Hospital only)
router.put('/:id/status', protect, isHospital, validateMongoId, updateAppointmentStatus);
router.delete('/:id', validateMongoId, cancelAppointment);

export default router;