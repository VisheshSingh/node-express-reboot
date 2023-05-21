const { StatusCodes } = require('http-status-codes');
const Review = require('../models/Review');
const checkPermissions = require('../utils/checkPermissions');
const { NotFoundError, BadRequestError } = require('../errors');
const Product = require('../models/Product');

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new BadRequestError('Invalid product id');
  }

  // Check if user already left a review
  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user.id,
  });

  if (alreadyReviewed) {
    throw new BadRequestError('Already reviewed!');
  }
  req.body.user = req.user.id;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name price category company',
  });
  res.status(StatusCodes.OK).json(reviews);
};

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError('No review found with id');
  }
  res.status(StatusCodes.OK).json(review);
};

const updateReview = async (req, res) => {
  const { title, comment, rating } = req.body;

  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError('Could not update. No review found with id.');
  }
  checkPermissions(req.user, review.user);
  review.rating = rating || review.rating;
  review.title = title || review.title;
  review.comment = comment || review.comment;
  await review.save();
  res.status(StatusCodes.OK).json(review);
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  console.log(req.user);
  if (!review) {
    throw new NotFoundError('Could not delete. No review found with id.');
  }
  checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review deleted!' });
};

const getProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getProductReviews,
};
