const Request = require('../models/requestModel');
const Item = require('../models/itemModel');
const Transaction = require('../models/transactionModel'); // Import Transaction model

// @desc    Create a new request for an item
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  const { itemId, type, message, lendDuration } = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.owner.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "You cannot request your own item" });
    }
    if (item.status !== 'available') {
      return res.status(400).json({ message: 'Item is not available for request' });
    }

    const request = new Request({
      item: itemId,
      owner: item.owner,
      requester: req.user._id,
      type,
      message,
      lendDuration,
    });

    const createdRequest = await request.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get requests received by the current user
// @route   GET /api/requests/incoming
// @access  Private
const getIncomingRequests = async (req, res) => {
    try {
        const requests = await Request.find({ owner: req.user._id, status: 'pending' })
            .populate('item', 'name')
            .populate('requester', 'name picture');
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get requests made by the current user
// @route   GET /api/requests/outgoing
// @access  Private
const getOutgoingRequests = async (req, res) => {
    try {
        const requests = await Request.find({ requester: req.user._id })
            .populate('item', 'name')
            .populate('owner', 'name');
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a request status (accept/decline)
// @route   PUT /api/requests/:id
// @access  Private
const updateRequestStatus = async (req, res) => {
    const { status } = req.body; // 'accepted' or 'declined'

    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        request.status = status;

        if (status === 'accepted') {
            await Item.findByIdAndUpdate(request.item, { status: 'lent' });

            // *** CREATE A NEW TRANSACTION ***
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + (request.lendDuration || 7)); 

            await Transaction.create({
                item: request.item,
                owner: request.owner,
                borrower: request.requester,
                request: request._id,
                returnDate: returnDate,
            });
        }

        await request.save();
        res.json(request);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
  createRequest,
  getIncomingRequests,
  getOutgoingRequests,
  updateRequestStatus,
};
