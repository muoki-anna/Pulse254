import express from 'express';
import {
  getAllBloodRequests,
  getBloodRequestById,
  createBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
  getMyBloodRequests,
  getBloodRequestStats,
} from '../controllers/bloodRequestController.js';
import { protect, isHospital, optionalAuth } from '../middleware/auth.js';
import {
  validateBloodRequest,
  validateMongoId,
} from '../middleware/validation.js';

const router = express.Router();

// IMPORTANT: Specific routes BEFORE parameterized routes
router.get('/stats', getBloodRequestStats);
router.get('/hospital/my-requests', protect, isHospital, getMyBloodRequests);

// Public routes
router.get('/', optionalAuth, getAllBloodRequests);
router.get('/:id', validateMongoId, getBloodRequestById);

// Protected routes (Hospital only)
router.post('/', protect, isHospital, validateBloodRequest, createBloodRequest);
router.put('/:id', protect, isHospital, validateMongoId, updateBloodRequest);
router.delete('/:id', protect, isHospital, validateMongoId, deleteBloodRequest);

export default router;