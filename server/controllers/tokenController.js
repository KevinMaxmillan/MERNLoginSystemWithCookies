import jwt from 'jsonwebtoken';
import User from '../models/user.js';

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

// Authenticate Token 
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Refresh Token
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) throw { status: 401, message: 'Refresh token missing' };

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) throw { status: 403, message: 'Invalid refresh token' };

            const user = await User.findById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                throw { status: 403, message: 'Refresh token does not match' };
            }

            console.log("Access token generated");
            
            const newAccessToken = generateAccessToken(user);
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, path: '/' });
            res.json({ message: "Token refreshed" });
        });
    } catch (err) {
        next(err);
    }
};

export {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};
