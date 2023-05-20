const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
} = require('../controllers/userController');
const authenticateUser = require('../middleware/authentication');
const authorizeRoutes = require('../middleware/authorization');

router.route('/').get(authenticateUser, authorizeRoutes('admin'), getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updatePassword);
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
