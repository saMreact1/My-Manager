const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// router.get('/admin', /*verifyToken,*/ authorizeRole('admin'),(req, res) => {
//     res.send('Welcome, admin');
//   }, taskController.getAllTasks); // Get all tasks
router.get('/', /*verifyToken,*/ taskController.getAllTasks)
router.post('/', /*verifyToken,*/ taskController.createTask); // Create a new task
router.put('/:id', /*verifyToken,*/ taskController.updateTask); // Update an existing task
router.delete('/:id', /*verifyToken,*/ taskController.deleteTask); // Delete a task
router.get('/stats', taskController.getDashboardStats);
router.get('/user', authMiddleware.authMiddleware, taskController.getUserTasks);

module.exports = router;