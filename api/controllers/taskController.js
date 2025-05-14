const { Task } = require('../db/models/task.model');
const { User } = require('../db/models/user.model');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ message: 'Error creating task', error: err });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: 'Error updating task', error: err });
    }
};
  
// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });
  }
};

// Get tasks assigned to a user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const userRole = req.user.role;

    let tasks;

    if (userRole === 'admin') {
      // Admin gets all tasks
      tasks = await Task.find().populate('assignedTo', 'name');
    } else {
      // Regular user gets only their tasks
      tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'name');
    }

    res.json(tasks);    
  } catch (err) {
    console.error('🔥 Failed to fetch tasks:', err);
    res.status(500).json({ message: 'Failed to fetch user tasks' });
  }
};

// Get stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // <- this line needs User to be defined

    const allTasks = await Task.find();
    const stats = {
      totalTasks: allTasks.length,
      pending: allTasks.filter(t => t.status === 'Pending').length,
      inProgress: allTasks.filter(t => t.status === 'In-Progress').length,
      done: allTasks.filter(t => t.status === 'Done').length,
      users: totalUsers
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};

// exports.getTasksStats = async (req, res) => {
//   try {
//     const allTasks = await Task.find();

//     const getStats = (tasks) => ({
//       total: tasks.length,
//       pending: tasks.filter(t => t.status === 'Pending').length,
//       progress: tasks.filter(t => t.status === 'In-Progress').length,
//       done: tasks.filter(t => t.status === 'Done').length
//     });

//     const stats = getStats(allTasks);

//     res.json(stats); // ✅ Now you're sending the actual stats
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch task stats' });
//   }
// };
