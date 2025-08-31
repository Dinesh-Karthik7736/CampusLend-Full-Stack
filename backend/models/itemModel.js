const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  owner: {
    type: String, // Firebase UID
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  listingType: {
    type: String,
    enum: ['Lend', 'Barter', 'Lend or Barter'],
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'requested', 'lent', 'unavailable'],
    default: 'available',
  },
  location: {
    type: String,
    required: true,
  },
  // --- NEW FIELDS ---
  availableFrom: {
    type: Date,
  },
  availableTo: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
