const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
} = require('../controllers/userController');
const auth = require('../middleware/authentication');
const authorizeRoutes = require('../middleware/authorization');

router.route('/').get(auth, authorizeRoutes('admin'), getAllUsers);
router.route('/showMe').get(auth, showCurrentUser);
router.route('/updateUser').patch(auth, updateUser);
router.route('/updatePassword').patch(auth, updatePassword);
router.route('/:id').get(getSingleUser);

module.exports = router;
