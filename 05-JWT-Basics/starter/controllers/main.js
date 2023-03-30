const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest('Please provide valid username and password');
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ msg: 'Login success', token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100 + 1);
  res.status(200).json({
    msg: `Hello! ${req.user}!`,
    secret: `Your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
