const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token user' });
    }
    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function requireLibrarian(req, res, next) {
  if (req.user && req.user.role === 'librarian') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: librarian access only' });
}

module.exports = {
  verifyToken,
  requireLibrarian
};

