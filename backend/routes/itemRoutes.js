// This is the updated content for your itemRoutes.js file

const express = require('express');
const router = express.Router();
const {
  createItem,
  getAvailableItems,
  getMyItems,
  getItemById,
  deleteItem, // <-- Import deleteItem
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createItem)
  .get(getAvailableItems);

router.route('/myitems').get(getMyItems);

router.route('/:id')
  .get(getItemById)
  .delete(deleteItem); // <-- Add the delete route

module.exports = router;
