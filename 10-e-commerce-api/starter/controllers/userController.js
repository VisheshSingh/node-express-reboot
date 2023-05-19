const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { NotFoundError, BadRequestError } = require('../errors');

const getAllUsers = async (req, res) => {
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
  res.status(StatusCodes.OK).json({
    user: req.user,
  });
};

const updateUser = async (req, res) => {
  res.send('UPDATE USER');
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('PLease provide old and new password');
  }

  const user = await User.findOne({ _id: req.user.id });

  const isPwdCorrect = await user.comparePassword(oldPassword);

  if (!isPwdCorrect) {
    throw new BadRequestError('Invalid credentials!');
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Password is updated!' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
};
