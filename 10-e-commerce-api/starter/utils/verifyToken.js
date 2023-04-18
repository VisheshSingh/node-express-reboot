const jwt = require('jsonwebtoken');

const isTokenValid = (token) => {
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  return isValid;
};

module.exports = isTokenValid;
