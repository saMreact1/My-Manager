// This fiile will handle connection logic to the MongoDB database using Mongoose
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing from .env');
  process.exit(1);
}

mongoose.Promise = global.Promise; // Use native promises

mongoose.connect(MONGO_URI, {
    dbName: 'my-manager'
  })
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('❌MongoDB connection error:', err));
  

module.exports = mongoose;