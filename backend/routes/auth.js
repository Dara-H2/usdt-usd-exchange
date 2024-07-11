const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
// router.post('/register', async (req, res) => {
//   const { name, Phonenumber, password, role } = req.body;

//   try {
//     let user = await User.findOne({ Phonenumber });

//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       name,
//       Phonenumber,
//       password,
//       role: role || 'user',
//     });

//     await user.save();
//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
router.post('/register', async (req, res) => {
  const { name, Phonenumber, password, role } = req.body;

  try {
    let user = await User.findOne({ Phonenumber });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      Phonenumber,
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { Phonenumber, password } = req.body;

  try {
    const user = await User.findOne({ Phonenumber });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role, userId: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
