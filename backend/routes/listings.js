// // backend/routes/listings.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth')
// const User = require('../models/User');

// // Create a new listing
// router.post('/:userId/listings', async (req, res) => {
//   const { userId } = req.params;
//   const { type, amount, price } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     const newListing = { type, amount, price };
//     user.listings.push(newListing);
//     await user.save();

//     res.status(201).json(newListing);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Fetch listings for a user
// router.get('/:userId/listings', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.json(user.listings);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
// backend/routes/listings.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Create a new listing
router.post('/:userId/listings', auth, async (req, res) => {
  const { userId } = req.params;
  const { type, amount, price } = req.body;

  try {
    if (req.user.id !== userId && req.user.role !== 'operator') {
      return res.status(403).json({ msg: 'Authorization denied' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newListing = { type, amount, price };
    user.listings.push(newListing);
    await user.save();

    const createdListing = user.listings[user.listings.length - 1];
    res.status(201).json(createdListing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Fetch listings for a user
router.get('/:userId/listings', auth, async (req, res) => {
  const { userId } = req.params;

  try {
    if (req.user.id !== userId && req.user.role !== 'operator') {
      return res.status(403).json({ msg: 'Authorization denied' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

