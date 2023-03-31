const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token found!');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authorization invalid!');
  }
};

module.exports = protectRoute;
