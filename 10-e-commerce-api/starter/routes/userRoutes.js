const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
} = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updatePassword);
router.route('/:id').get(getSingleUser);

module.exports = router;
