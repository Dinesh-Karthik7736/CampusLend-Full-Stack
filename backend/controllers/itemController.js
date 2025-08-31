const Item = require('../models/itemModel');

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  // Destructure the new date fields from the request body
  const { name, description, category, listingType, location, availableFrom, availableTo } = req.body;

  if (!name || !description || !category || !listingType || !location) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const item = new Item({
      name,
      description,
      category,
      listingType,
      location,
      // If the date string from the form is empty, store it as null in the database.
      availableFrom: availableFrom || null,
      availableTo: availableTo || null,
      owner: req.user._id,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ... (The rest of your functions: getAvailableItems, getMyItems, etc.)

const getAvailableItems = async (req, res) => {
  try {
    const items = await Item.find({ 
        status: 'available', 
        owner: { $ne: req.user._id }
    }).populate('owner', 'name picture trustScore');

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ owner: req.user._id });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('owner', 'name email picture');
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createItem,
  getAvailableItems,
  getMyItems,
  getItemById,
  deleteItem,
};
