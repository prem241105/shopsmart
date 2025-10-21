const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// GET login page data
router.get('/', function(req, res, next) {
  res.json({ message: 'Login page', title: 'Login' });
});

// POST login (username/password)
router.post('/', async function(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (error) {
    next(error);
  }
});

// Google OAuth routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home
    res.redirect('/');
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
