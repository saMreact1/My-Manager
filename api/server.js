const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
const { mongoose } = require('./db/mongoose'); // Load mongoose connection

// Load middleware
app.use(bodyParser.json()); // Parse JSON request body
app.use(express.json())

const authRoutes = require('./routes/authRoutes'); // Load auth routes
const taskRoutes = require('./routes/taskRoutes'); // Load task routes
const userRoutes = require('./routes/userRoutes');

// Load mongoose models
const { Task } = require('./db/models/task.model');

// ✅ Setup CORS properly for local dev
app.use(cors({
    origin: 'http://localhost:4200', // Allow Angular dev server
    credentials: true               // Allow cookies if needed (like with JWT auth)
}));

// Load routes
app.use('/auth', authRoutes); // Use auth routes
app.use('/tasks', taskRoutes); // Use task routes
app.use('/admin', userRoutes);




app.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
})