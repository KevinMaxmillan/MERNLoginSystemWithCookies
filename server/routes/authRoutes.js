const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = express.Router();
const { test, registerUser, loginUser, refreshToken, logoutUser } = require('../controllers/authController');



router.get('/', test);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/refresh', refreshToken);
router.post('/logout', logoutUser);





module.exports = router;
