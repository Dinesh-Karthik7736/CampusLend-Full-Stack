const express = require('express');
const router = express.Router();
const { getActiveTransactions, confirmReturn } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/active').get(getActiveTransactions);

// --- NEW ROUTE ---
router.route('/:id/confirm-return').put(confirmReturn);

module.exports = router;
