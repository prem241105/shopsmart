const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

// GET products
router.get('/', async function(req, res, next) {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      // Seed the database if it's empty
      const productsData = fs.readFileSync(path.join(__dirname, '../public/products.json'));
      const productsJson = JSON.parse(productsData);
      await Product.insertMany(productsJson);
      products = await Product.find();
    }
    res.json({ title: 'Products', products: products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
