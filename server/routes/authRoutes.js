import express from 'express';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/authController.js';
import { refreshToken } from '../controllers/tokenController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshToken);
router.get("/profile", authMiddleware, getProfile);
router.post('/logout', logoutUser);

export default router;
