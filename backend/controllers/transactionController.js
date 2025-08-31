const Transaction = require('../models/transactionModel');
const Item = require('../models/itemModel'); // Make sure to require the Item model at the top

// @desc    Get active transactions for the current user (both lent and borrowed)
// @route   GET /api/transactions/active
// @access  Private
const getActiveTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ owner: req.user._id }, { borrower: req.user._id }],
      status: { $in: ['active', 'overdue'] }
    })
    .populate('item', 'name')
    .populate('owner', 'name')
    .populate('borrower', 'name');

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Mark a transaction as completed by the owner
// @route   PUT /api/transactions/:id/confirm-return
// @access  Private
const confirmReturn = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Ensure the person confirming is the owner of the item
    if (transaction.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update the transaction
    transaction.status = 'completed';
    transaction.returnConfirmedByOwner = true;
    await transaction.save();

    await Item.findByIdAndUpdate(transaction.item, { status: 'available' });

    res.json({ message: 'Return confirmed and transaction completed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Make sure to export both functions
module.exports = { 
    getActiveTransactions, 
    confirmReturn
};
