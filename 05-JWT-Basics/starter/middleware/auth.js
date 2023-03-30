const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new CustomAPIError('No token!', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next();
  } catch (error) {
    throw new CustomAPIError('Forbidden!', 403);
  }
};

module.exports = protectRoute;
