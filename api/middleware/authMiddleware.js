const jwt = require('jsonwebtoken');
const { User } = require('../db/models/user.model')

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey';

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId // if you’re using multi-tenant logic
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Role-based Authorization Middleware
exports.requireRole = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. No user information available.' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    }
}
