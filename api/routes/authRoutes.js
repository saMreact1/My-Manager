const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

// router.post('/register', authenticate, requireRole('admin'), authController.register);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


module.exports = router;
