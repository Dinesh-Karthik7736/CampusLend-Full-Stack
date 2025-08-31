const express = require('express');
const router = express.Router();
const {
    createRequest,
    getIncomingRequests,
    getOutgoingRequests,
    updateRequestStatus,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

// Protect all request routes
router.use(protect);

// @route   POST /api/requests
router.route('/').post(createRequest);

// @route   GET /api/requests/incoming
router.route('/incoming').get(getIncomingRequests);

// @route   GET /api/requests/outgoing
router.route('/outgoing').get(getOutgoingRequests);

// @route   PUT /api/requests/:id
router.route('/:id').put(updateRequestStatus);

module.exports = router;
