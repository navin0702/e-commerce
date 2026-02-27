const express = require('express');
const router = express.Router();
const { loginUser, getUserById } = require('../controllers/userController');

// POST - user login/registration
router.post('/login', loginUser);

// GET - user by ID
router.get('/:id', getUserById);

module.exports = router;