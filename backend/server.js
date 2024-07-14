// // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// // app.use(bodyParser.json());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Import routes
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const listingsRoutes = require('./routes/listings');
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/users', listingsRoutes);


// app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const { TronWeb } = require('tronweb');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const listingsRoutes = require('./routes/listings');
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/users', listingsRoutes);

// const tronWeb = new TronWeb({
//   fullHost: 'https://api.trongrid.io',
//   headers: { "TRON-PRO-API-KEY": '7c9a0ccb-2cf9-416c-b783-9c1d63b738b1' }
// });

// const USDT_CONTRACT_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';  // Replace with actual USDT contract address

// async function monitorUSDTTransfers() {
//   const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);

//   contract.Transfer().watch(async (err, event) => {
//     if (err) {
//       console.error('Error watching events:', err);
//     } else {
//       console.log('New Transfer event:', event);
//       await handleTransferEvent(event);
//     }
//   });
// }

// async function handleTransferEvent(event) {
//   const { from, to, value } = event;
//   console.log(`Transfer from ${from} to ${to} of value ${value}`);

//   try {
//     const user = await User.findOne({ walletAddress: to });

//     if (!user) {
//       console.error('User not found for wallet address:', to);
//       return;
//     }

//     user.balance += parseInt(value);
//     await user.save();
//     console.log('Balance updated successfully');
//   } catch (error) {
//     console.error('Error updating balance:', error);
//   }
// }

// monitorUSDTTransfers();

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const { TronWeb } = require('tronweb');
// const User = require('./models/User');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const listingsRoutes = require('./routes/listings');
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/users', listingsRoutes);

// const tronWeb = new TronWeb({
//   fullHost: 'https://api.trongrid.io',
//   headers: { "TRON-PRO-API-KEY": '7c9a0ccb-2cf9-416c-b783-9c1d63b738b1'  }
// });

// const USDT_CONTRACT_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';  // Replace with actual USDT contract address
// async function monitorUSDTTransfers() {
//   try {
//     const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);

//     async function getRecentEvents() {
//       try {
//         const events = await tronWeb.getEventResult(USDT_CONTRACT_ADDRESS, {
//           eventName: 'Transfer',
//           onlyConfirmed: true,
//           size: 1000,
//         });

//         if (Array.isArray(events)) {
//           for (const event of events) {
//             await handleTransferEvent(event);
//           }
//         } else {
//           console.error('Events are not an array:', events);
//         }
//       } catch (err) {
//         console.error('Error fetching events:', err);
//       }
//     }

//     setInterval(getRecentEvents, 30000); // Every 30 seconds
//   } catch (err) {
//     console.error('Error initializing contract:', err);
//   }
// }

// async function handleTransferEvent(event) {
//   const { result: { from, to, value } = {} } = event;
//   console.log(`Transfer from ${from} to ${to} of value ${value}`);

//   try {
//     const user = await User.findOne({ walletAddress: to });

//     if (!user) {
//       console.error('User not found for wallet address:', to);
//       return;
//     }

//     user.balance += parseInt(value, 10);
//     await user.save();
//     console.log('Balance updated successfully');
//   } catch (error) {
//     console.error('Error updating balance:', error);
//   }
// }

// monitorUSDTTransfers();

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const listingsRoutes = require('./routes/listings');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', listingsRoutes);

const TRC20_CONTRACT_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';  // USDT contract address

async function fetchUserTransactions(address) {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const url = `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&contract_address=${TRC20_CONTRACT_ADDRESS}&only_to=true`;
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data || [];  // data.data contains the transactions
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

async function updateUserBalance() {
  try {
    const users = await User.find();
    
    for (const user of users) {
      const transactions = await fetchUserTransactions(user.walletAddress);
      
      let totalReceived = 0;
      transactions.forEach(tx => {
        totalReceived += parseInt(tx.value, 10);
      });

      user.balance = totalReceived * 1e-6;
      await user.save();
      console.log(`Updated balance for user ${user.name}: ${user.balance}`);
    }
  } catch (error) {
    console.error('Error updating user balances:', error);
  }
}

// Poll every minute (60000 ms)
setInterval(updateUserBalance, 60000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


