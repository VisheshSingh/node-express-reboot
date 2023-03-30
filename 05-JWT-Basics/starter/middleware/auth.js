const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../errors');
const CustomAPIError = require('../errors/custom-error');

const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new Unauthenticated('No token!', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next();
  } catch (error) {
    throw new CustomAPIError('Forbidden!');
  }
};

module.exports = protectRoute;
