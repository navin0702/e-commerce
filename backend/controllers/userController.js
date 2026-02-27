const User = require('../models/User');

// @desc    Register/login user (create session)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required');
    }

    // find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    } else {
      // update name/phone if provided
      user.name = name || user.name;
      user.phone = phone || user.phone;
      await user.save();
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { loginUser, getUserById };