const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const { NotFoundError, BadRequestError } = require('../errors');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No items in the cart!');
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError('No tax or shipping fee');
  }
  let orderItems = [];
  let subtotal = 0;
  for (let item of cartItems) {
    const prodExists = await Product.findOne({ _id: item.product });
    if (!prodExists) {
      throw new NotFoundError('Product not found!');
    }
    const { name, price, image, _id } = prodExists;
    const singleOrderItem = {
      name,
      price,
      image,
      amount: +item.amount,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += +item.amount * price;
    console.log({ orderItems, subtotal });
  }
  res.send('cr');
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
