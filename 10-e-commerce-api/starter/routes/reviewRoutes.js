const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const authenticateRoute = require('../middleware/authentication');

router.route('/').post(authenticateRoute, createReview).get(getAllReviews);
router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateRoute, updateReview)
  .delete(authenticateRoute, deleteReview);

module.exports = router;
