const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const attachCookiesToResponse = require('../utils/attachCookiesToResponse');

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
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email and passwors are required fields!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('User does not exists');
  }
  const pwdMatch = await user.comparePassword(password);

  if (!pwdMatch) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = { name: user.name, id: user._id, role: user.role };
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = (req, res) => {
  res.json({ msg: 'logout' });
};

module.exports = {
  register,
  login,
  logout,
};
