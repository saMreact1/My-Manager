const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');

// router.get('/', authenticate, taskController.getAllTasks)
router.post('/', taskController.createTask); // Create a new task
router.put('/:id', taskController.updateTask); // Update an existing task
router.delete('/:id', taskController.deleteTask); // Delete a task
router.get('/stats', taskController.getDashboardStats);
router.get('/', authenticate, taskController.getUserTasks);

module.exports = router;
