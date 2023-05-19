const { UnauthenticatedError } = require('../errors');
const UnauthorizedError = require('../errors/not-authorized');

const authorizeRoutes = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Not authorized to access!');
    }
    next();
  };
};

module.exports = authorizeRoutes;
