const express = require('express');
const { dashboard, login } = require('../controllers/main');
const protectRoute = require('../middleware/auth');
const router = express.Router();

router.route('/dashboard').get(protectRoute, dashboard);
router.route('/login').post(login);

module.exports = router;
