import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import logger from '../config/logger.js';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const generateTokens = (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
};


// Refresh Token
export const refreshToken = asyncHandler(async (req, res, next) => {
    
        const { refreshToken } = req.cookies;
        if (!refreshToken) throw { status: 401, message: 'Refresh token missing' };

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) throw { status: 403, message: 'Invalid refresh token' };

            const newAccessToken = generateAccessToken({ _id: decoded.id });
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, path: '/' });
            

            logger.info("Access token generated");
            
  
            
            res.json({ message: "Token refreshed" });
        });
  
});

export {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};
