const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  owner: {
    type: String, // Firebase UID
    ref: 'User',
    required: true,
  },
  borrower: {
    type: String, // Firebase UID
    ref: 'User',
    required: true,
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'overdue'],
    default: 'active',
  },
  lentDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    required: true,
  },

  returnConfirmedByOwner: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
