const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const { refreshToken } = require('../controllers/tokenController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshToken);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

module.exports = router;
