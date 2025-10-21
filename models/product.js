const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  store: String,
  price: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  prices: [priceSchema],
  image: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
