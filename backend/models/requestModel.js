const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Item',
  },
  owner: {
    type: String, // Firebase UID
    required: true,
    ref: 'User',
  },
  requester: {
    type: String, // Firebase UID
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'cancelled'],
    default: 'pending',
  },
  type: { // Lend or Barter
      type: String,
      required: true,
  },
  message: {
      type: String,
  },
  lendDuration: { // in days
      type: Number,
  }
}, {
  timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
