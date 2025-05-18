const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

// router.post('/register', authenticate, requireRole('admin'), authController.register);
router.post('/register', authController.registerAdmin);
router.post('/login', authController.login);

module.exports = router;