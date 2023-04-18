const { BadRequestError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError('Email already exists!');
  }
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json(user);
};

const login = (req, res) => {
  res.json({ msg: 'login' });
};

const logout = (req, res) => {
  res.json({ msg: 'logout' });
};

module.exports = {
  register,
  login,
  logout,
};
