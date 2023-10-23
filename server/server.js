// Core libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

// Configuration and initial setup
dotenv.config();
require('./config/passportSetup');

const app = express();
const PORT = process.env.PORT || 5090;
const CLIENT_URL = "http://localhost:5173";  // Make this configurable for different environments

// Middleware stack
app.use(morgan('combined')); // For logging HTTP requests. 'combined' gives detailed information.
app.use(cors({ origin: CLIENT_URL, credentials: true })); // CORS setup
app.use(express.json()); // For parsing JSON request body
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Helper Functions
const redirectOnError = (url, error) => `${url}/login${error ? `?error=${error}` : ''}`;
const authenticate = (strategy, options = {}) => passport.authenticate(strategy, options);

// Routes
// Use descriptive route names and separate route handlers for better readability and maintainability
app.get('/auth/google', authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/redirect', authenticate('google'), handleGoogleRedirect);
app.get('/auth/logout', handleLogout);
app.get('/api/isAuthenticated', checkAuthentication);
app.get('/api/profile', isAuthenticated, getProfile);
app.get('/some-protected-route', isAuthenticated, handleProtectedRoute);

// Route Handlers
function handleGoogleRedirect(req, res) {
  req.isAuthenticated()
    ? res.redirect(CLIENT_URL)
    : res.redirect(redirectOnError(CLIENT_URL, 'Not+Allowed'));
}

function handleLogout(req, res) {
  req.logout();
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');
    res.clearCookie('connect.sid');
    res.redirect(CLIENT_URL);
  });
}

function checkAuthentication(req, res) {
  res.json({ isAuthenticated: req.isAuthenticated() });
}

function getProfile(req, res) {
  res.json({ user: req.user || null });
}

function handleProtectedRoute(req, res) {
  // Your protected route logic here
}

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).send('Not authenticated');
}

// Server start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
