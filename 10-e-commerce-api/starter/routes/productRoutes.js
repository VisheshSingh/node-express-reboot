const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');
const authenticateUser = require('../middleware/authentication');
const authorizeRoutes = require('../middleware/authorization');
const { getProductReviews } = require('../controllers/reviewController');

router
  .route('/')
  .post(authenticateUser, authorizeRoutes('admin'), createProduct)
  .get(getAllProducts);
router
  .route('/upload')
  .post(authenticateUser, authorizeRoutes('admin'), uploadImage);
router
  .route('/:id')
  .get(getSingleProduct)
  .patch(authenticateUser, authorizeRoutes('admin'), updateProduct)
  .delete(authenticateUser, authorizeRoutes('admin'), deleteProduct);

router.route('/:id/reviews').get(getProductReviews);

module.exports = router;
