const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const validated_users = require('./src/local_database');

// Serve compiled Vue.js application
app.use(express.static('dist'));


// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Find user by username and password
    const user = validated_users.find(user => user.username === username && user.password === password);
  
    if (!user) {
      // Return 401 Unauthorized if user not found or credentials are invalid
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    // You may implement JWT or session-based authentication here
    // For demonstration, we'll simply return a success message and user data
    res.json({ message: 'Login successful', user });
  });
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
  
    // Check if authentication token is valid (you may have your own authentication logic)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Dummy authentication logic for demonstration purposes (replace with your actual logic)
    // Here, we assume the token contains the user's role
    const user = validated_users.find(user => user.role === token);
  
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Set user data in request object for use in other middleware or routes
    req.user = user;
    next();
  };
  
  // Admin endpoint (requires authentication with admin role)
  app.get('/admin', isAuthenticated, (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    // Return a simple welcome message for admin users
    res.json({ message: 'Welcome, admin!' });
  });
  
  // User endpoint (requires authentication)
  app.get('/user', isAuthenticated, (req, res) => {
    // Return a simple welcome message for both admin and user roles
    res.json({ message: 'Welcome, user!' });
  });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });