const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authorizeRole = require('../middleware/authorizeRole')
const { verifyToken } = require('../middleware/authMiddleware');

// router.get('/admin', /*verifyToken,*/ authorizeRole('admin'),(req, res) => {
//     res.send('Welcome, admin');
//   }, taskController.getAllTasks); // Get all tasks
router.get('/', /*verifyToken,*/ taskController.getAllTasks)
router.post('/', /*verifyToken,*/ taskController.createTask); // Create a new task
router.put('/:id', /*verifyToken,*/ taskController.updateTask); // Update an existing task
router.delete('/:id', /*verifyToken,*/ taskController.deleteTask); // Delete a task
router.get('/tasks-stats', taskController.getTasksStats)

module.exports = router;