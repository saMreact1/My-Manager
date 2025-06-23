const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
const { mongoose } = require('./db/mongoose'); // Load mongoose connection

// Load middleware
app.use(express.json())

const authRoutes = require('./routes/authRoutes'); // Load auth routes
const taskRoutes = require('./routes/taskRoutes'); // Load task routes
const userRoutes = require('./routes/userRoutes');

// Load mongoose models
const { Task } = require('./db/models/task.model');

const allowedOrigins = [
  'http://localhost:4200',
  'https://my-managerr.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // only if you're sending cookies/auth headers
}));

// Load routes
app.get('/', (req, res) => {
  res.send('🚀 Backend is live and working!');
});

app.use('/auth', authRoutes); // Use auth routes
app.use('/tasks', taskRoutes); // Use task routes
app.use('/admin', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`✅ Server is running on port`);
})
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})
