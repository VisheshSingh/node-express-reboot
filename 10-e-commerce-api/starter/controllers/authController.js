const User = require('../models/User');
const createToken = require('../utils/createToken');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError('Email already exists!');
  }
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, id: user._id, role: user.role };
  const token = createToken(tokenUser);
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
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
