var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var aboutRouter = require('./routes/about');
var productRouter = require('./routes/product');

const mongoose = require('mongoose');
// For local MongoDB, use: mongoose.connect('mongodb://localhost:27017/shopsmart')
// For Atlas, ensure IP is whitelisted
mongoose.connect('mongodb://localhost:27017/shopsmart')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

var app = express();

// Passport configuration
require('./config/passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve Angular build files
app.use(express.static(path.join(__dirname, 'client/dist/client/browser')));

app.use('/api/', indexRouter);             // Home page API
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);        // Login page API
app.use('/api/register', registerRouter);  // Register page API
app.use('/api/about', aboutRouter);        // About page API
app.use('/api/products', productRouter);    // Product page API

// Catch all handler: send back index.html for Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/client/browser/index.html'));
});

module.exports = app;
