const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc login admin
// @route POST /api/admin/login
// @access public
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error('Username and password are required');
    }

    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.json({ token });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { loginAdmin };