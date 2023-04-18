const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

module.exports = createToken;
