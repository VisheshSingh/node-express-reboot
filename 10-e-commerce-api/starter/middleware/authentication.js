const { UnauthenticatedError } = require('../errors');
const isTokenValid = require('../utils/verifyToken');

const auth = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('No token!');
  }

  try {
    const { name, id, role } = isTokenValid(token);
    req.user = { name, id, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Token invalid!');
  }
};

module.exports = auth;
