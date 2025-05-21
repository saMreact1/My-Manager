const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

// Hash password before saving
// UserSchema.pre('save', async function (next) {
//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 7);
//     next();
// });

// Compare password method
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = { User };
