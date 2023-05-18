const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  console.log('req.user', req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  res.send('Show Current User');
};

const updateUser = async (req, res) => {
  res.send('UPDATE USER');
};

const updatePassword = async (req, res) => {
  res.send('update password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
};
