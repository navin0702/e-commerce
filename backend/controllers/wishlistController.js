const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist/:userId
// @access  Public
const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.params.userId, items: [] });
    }
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/:userId
// @access  Public
const addToWishlist = async (req, res, next) => {
  try {
    const { productId, name, price, image } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.params.userId, items: [] });
    }

    // check if product already in wishlist
    const exists = wishlist.items.find((item) => item.productId?.toString() === productId);
    if (!exists) {
      wishlist.items.push({ productId, name, price, image });
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:userId/:itemId
// @access  Public
const removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      res.status(404);
      throw new Error('Wishlist not found');
    }

    wishlist.items = wishlist.items.filter((item) => item._id?.toString() !== req.params.itemId);
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };