const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  getCurrentUserOrders,
} = require('../controllers/orderController');
const authenticateUser = require('../middleware/authentication');
const authorizeRoutes = require('../middleware/authorization');

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeRoutes('admin'), getAllOrders);

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders);
router
  .route('/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

module.exports = router;
