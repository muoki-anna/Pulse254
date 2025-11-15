import { body, param, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Hospital registration validation
export const validateHospitalRegistration = [
  body('hospitalName')
    .trim()
    .notEmpty()
    .withMessage('Hospital name is required')
    .isLength({ min: 3 })
    .withMessage('Hospital name must be at least 3 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('contactPhone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone is required')
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  handleValidationErrors,
];

// Hospital login validation
export const validateHospitalLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// Blood request validation
export const validateBloodRequest = [
  body('bloodType')
    .trim()
    .notEmpty()
    .withMessage('Blood type is required')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Invalid blood type'),
  body('unitsNeeded')
    .notEmpty()
    .withMessage('Units needed is required')
    .isInt({ min: 1 })
    .withMessage('Units needed must be at least 1'),
  body('urgency')
    .trim()
    .notEmpty()
    .withMessage('Urgency level is required')
    .isIn(['Critical', 'High', 'Moderate'])
    .withMessage('Invalid urgency level'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('deadline').trim().notEmpty().withMessage('Deadline is required'),
  body('contact')
    .trim()
    .notEmpty()
    .withMessage('Contact number is required')
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  handleValidationErrors,
];

// Appointment booking validation
export const validateAppointment = [
  body('bloodRequestId')
    .trim()
    .notEmpty()
    .withMessage('Blood request ID is required')
    .isMongoId()
    .withMessage('Invalid blood request ID'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('bloodType')
    .trim()
    .notEmpty()
    .withMessage('Blood type is required')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Invalid blood type'),
  body('date')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      return true;
    }),
  body('time').trim().notEmpty().withMessage('Appointment time is required'),
  body('idNumber')
    .trim()
    .notEmpty()
    .withMessage('ID/Passport number is required'),
  body('medicalConditions')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Medical conditions cannot exceed 1000 characters'),
  handleValidationErrors,
];

// MongoDB ID validation
export const validateMongoId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors,
];