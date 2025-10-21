var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const MongoStore = require('connect-mongo');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var aboutRouter = require('./routes/about');
var productRouter = require('./routes/product');

const mongoose = require('mongoose');
// Use environment variable for MongoDB URI, fallback to local for development
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopsmart';
mongoose.connect(mongoUri)
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
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable for session secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoUri })
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
