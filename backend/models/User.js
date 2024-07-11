// models/User.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['USDT', 'USD'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['listed', 'completed'],
    default: 'listed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'operator'],
    default: 'user',
  },
  listings: [ListingSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);