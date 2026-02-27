const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');

// GET cart
router.get('/:userId', getCart);

// Add to cart
router.post('/:userId', addToCart);

// Remove from cart
router.delete('/:userId/:itemId', removeFromCart);

// Clear cart
router.delete('/:userId', clearCart);

module.exports = router;