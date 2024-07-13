// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch all users


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const User = require('../models/User');
// const TronWeb = require('tronweb');

// const tronWeb = new TronWeb({
//     fullHost: 'https://api.trongrid.io',
// });

// router.post('/createWallet', auth, async (req, res) => {
//     try {
//         const newAccount = await tronWeb.createAccount();
//         const walletAddress = newAccount.address.base58;

//         const user = await User.findById(req.user.id);
//         user.walletAddress = walletAddress;
//         await user.save();

//         res.json({ walletAddress });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// router.post('/webhook', async (req, res) => {
//     const { to, amount } = req.body;

//     try {
//         const user = await User.findOne({ walletAddress: to });

//         if (user) {
//             user.balance += amount;
//             await user.save();
//         }

//         res.sendStatus(200);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
