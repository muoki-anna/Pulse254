// routes/donors.js
import express from 'express';
import {
  registerDonor,
  getDonors,
  getAvailableDonors,
  updateDonorAvailability,
  getDonorStats
} from '../controllers/donorController.js';
import { protect, isHospital, isAdmin } from '../middleware/auth.js';


const router = express.Router();

// Public routes
router.post('/register' ,registerDonor);

// Protected routes
router.get('/', protect, isHospital, getDonors);
router.get('/available/:bloodType', protect, isHospital, getAvailableDonors);
router.get('/stats', protect, isHospital, getDonorStats);
router.put('/:id/availability', protect, updateDonorAvailability);

export default router;