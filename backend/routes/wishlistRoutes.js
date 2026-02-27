const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// GET wishlist
router.get('/:userId', getWishlist);

// Add to wishlist
router.post('/:userId', addToWishlist);

// Remove from wishlist
router.delete('/:userId/:itemId', removeFromWishlist);

module.exports = router;