const UnauthorizedError = require('../errors/not-authorized');

const checkPermissions = (requestUser, resourceId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.id === resourceId.id.toString()) return;
  throw new UnauthorizedError('You are not authorized to access');
};

module.exports = checkPermissions;
