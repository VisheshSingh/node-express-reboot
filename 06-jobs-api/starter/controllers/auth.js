const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('Login');
};

module.exports = { login, register };
