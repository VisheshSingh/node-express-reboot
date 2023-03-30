const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError('Please provide valid username and password', 400);
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ msg: 'Login success', token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new CustomAPIError('No token!', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100 + 1);
    res.status(200).json({
      msg: `Hello! ${decoded.username}!`,
      secret: `Your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError('Forbidden!', 403);
  }
};

module.exports = {
  login,
  dashboard,
};
