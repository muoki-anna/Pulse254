// routes/bloodRequests.js
import express from 'express';
import {
  getAllBloodRequests,
  getBloodRequestById,
  createBloodRequest,
  createPublicBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
  getMyBloodRequests,
  getBloodRequestStats,
} from '../controllers/bloodRequestController.js';
import { protect, isHospital } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBloodRequests);
router.get('/stats', getBloodRequestStats);
router.get('/:id', getBloodRequestById);
router.post('/', createPublicBloodRequest); // Use public function for main POST endpoint

// Protected routes (Hospital only - for authenticated hospitals)
router.post('/hospital', protect, isHospital, createBloodRequest); // Move authenticated to /hospital
router.put('/:id', protect, isHospital, updateBloodRequest);
router.delete('/:id', protect, isHospital, deleteBloodRequest);
router.get('/hospital/my-requests', protect, isHospital, getMyBloodRequests);

export default router;