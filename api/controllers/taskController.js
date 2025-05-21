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
    console.log('✅ Incoming task body:', req.body);

    if (typeof req.body !== 'object' || req.body === null) {
      throw new Error('Invalid task payload');
    }

    const newTask = new Task(req.body);
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.error('🚨 Create Task Error:', err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};


// Update an existing task
exports.updateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: 'Error updating task', error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

// Get tasks assigned to a user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let tasks;

    if (userRole === 'admin') {
      // Admin gets all tasks
      tasks = await Task.find().populate('assignedTo', 'name email');
    } else {
      // Regular user gets only their tasks
      tasks = await Task.find({ assignedTo: userId});
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
    console.log('🤖 Authenticated user:', req.user);

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};
