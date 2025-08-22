var express = require('express');
var router = express.Router();
var path = require('path');

/* GET about page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../routes/shopsmart/about.html'));
});

module.exports = router;
