const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // console.log('Received data:', req.body);

    const user = await User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (err) {
    // console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUsers = (req, res) => {
    User.find()  // Find all users
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ message: 'Internal server error' });
        });
};

// exports.getUserStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     res.json({ totalUsers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch user stats' });
//   }
// };
