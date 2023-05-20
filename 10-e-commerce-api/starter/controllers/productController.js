const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const checkPermissions = require('../utils/checkPermissions');
const { NotFoundError } = require('../errors');

const createProduct = async (req, res) => {
  req.body.user = req.user.id;
  checkPermissions;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ products, countDocuments: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new NotFoundError('Product not found!');
  }
  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedProduct) {
    throw new NotFoundError('Could not update. Product not found!');
  }
  res.status(StatusCodes.OK).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new NotFoundError('Could not delete. Product not found!');
  }
  await Product.findOneAndDelete({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ msg: 'Product deleted!' });
};

const uploadImage = async (req, res) => {
  res.send('UPLOAD PRODUCT IMAGE');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
