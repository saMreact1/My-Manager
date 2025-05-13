const express = require('express');
const router = express.Router();
// const { register, login } = require('../controllers/authController');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;