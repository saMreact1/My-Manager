const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { tenantFilter } = require('../middleware/tenantMiddleware');

// Admin-only route to create new users
router.use(tenantFilter);

router.post('/users', authMiddleware.authenticate, authMiddleware.requireRole('admin'), userController.createUser);
router.get('/users', authMiddleware.authenticate, authMiddleware.requireRole('admin'), userController.getUsers);

module.exports = router;