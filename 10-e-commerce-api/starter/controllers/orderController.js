const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const { NotFoundError, BadRequestError } = require('../errors');
const Product = require('../models/Product');
const checkPermissions = require('../utils/checkPermissions');

const fakeStripeAPI = async ({ amount, currency }) => {
  const clientSecret = 'someRandomValue';
  return { clientSecret, amount, currency };
};

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
  }
  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    clientSecret: paymentIntent.clientSecret,
    user: req.user.id,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError('Order not found!');
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError('Order not found!');
  }
  checkPermissions(req.user, order.user);
  order.paymentId = req.body.paymentId;
  order.status = 'paid';
  await order.save();
  res.status(StatusCodes.OK).json(order);
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.findOne({ user: req.user.id });
  if (orders.length === 0) {
    throw new NotFoundError('We have no orders from you!');
  }
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  getCurrentUserOrders,
};
