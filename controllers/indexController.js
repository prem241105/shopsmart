const express = require('express');
const router = express.Router();

// GET home page data
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to ShopSmart API', title: 'ShopSmart' });
});

module.exports = router;
