const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const { NotFoundError, BadRequestError } = require('../errors');

const createOrder = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: 'CREATE ORDER' });
};

const getAllOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'GET ALL ORDERS' });
};

const getSingleOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'GET SINGLE ORDER' });
};

const updateOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'UPDATE ORDER' });
};

const getCurrentUserOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'SHOW ALL MY ORDERS' });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  getCurrentUserOrders,
};
