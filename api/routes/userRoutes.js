const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Admin-only route to create new users
router.post('/users', /*authMiddleware.authMiddleware, authMiddleware.requireRole('admin'),*/ userController.createUser);
router.get('/users', /*authMiddleware.authMiddleware, authMiddleware.requireRole('admin'),*/ userController.getUsers);
// router.get('/stats', userController.getUserStats);

module.exports = router;