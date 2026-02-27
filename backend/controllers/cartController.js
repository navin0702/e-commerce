const Cart = require('../models/Cart');
const User = require('../models/User');

// @desc    Get user cart
// @route   GET /api/cart/:userId
// @access  Public
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = await Cart.create({ userId: req.params.userId, items: [] });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/:userId
// @access  Public
const addToCart = async (req, res, next) => {
  try {
    const { productId, name, price, quantity, image } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = await Cart.create({ userId: req.params.userId, items: [] });
    }

    // check if product already in cart
    const existingItem = cart.items.find((item) => item.productId?.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, quantity: quantity || 1, image });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId/:itemId
// @access  Public
const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item) => item._id?.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/:userId
// @access  Public
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };