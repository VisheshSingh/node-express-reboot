const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('GET ALL PRODUCTS');
});

module.exports = router;
