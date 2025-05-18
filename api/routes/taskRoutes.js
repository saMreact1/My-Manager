const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware, authenticate } = require('../middleware/authMiddleware');
const { tenantFilter } = require('../middleware/tenantMiddleware');

router.use(tenantFilter);
// router.use(authMiddleware);

router.get('/', authenticate, taskController.getAllTasks)
router.post('/', authenticate, taskController.createTask); // Create a new task
router.put('/:id', taskController.updateTask); // Update an existing task
router.delete('/:id', taskController.deleteTask); // Delete a task
router.get('/stats', authenticate, taskController.getDashboardStats);
router.get('/user', authenticate, taskController.getUserTasks);

module.exports = router;