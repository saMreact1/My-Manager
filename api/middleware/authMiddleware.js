const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey';

// Authentication Middleware
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; // ✅ Correct spelling!

    // Log the Authorization header to see what it's receiving
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // ✅ Check for 'Bearer ' with a space
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ✅ Attach the user to the request
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ message: 'Token is invalid or expired' }); // ✅ 401 for token problems
    }
}

// Role-based Authorization Middleware
exports.requireRole = (role) => {
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
