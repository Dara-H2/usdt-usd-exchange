const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// This is a protected route that only operators can access
router.get('/dashboard', auth, role('operator'), (req, res) => {
  res.send('Welcome to the operator dashboard');
});

module.exports = router;
