const express = require('express');
const router = express.Router();

// GET about page data
router.get('/', function(req, res, next) {
  res.json({ message: 'About ShopSmart', title: 'About' });
});

module.exports = router;
