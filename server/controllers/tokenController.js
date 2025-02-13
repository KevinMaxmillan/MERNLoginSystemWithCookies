const jwt = require('jsonwebtoken');
const User = require('../models/user');


const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
};


const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
};


const generateTokens = (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
};

// Authenticate Token 
const authenticateToken = (req, res, next) => {
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
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing.' });

        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token.' });

            
            const user = await User.findById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ error: 'Refresh token does not match.' });
            }

            console.log("accesss token generated")
            
            const newAccessToken = generateAccessToken(user);
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, path: '/' });
            res.json({ accessToken: newAccessToken });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error refreshing token.' });
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens,
    authenticateToken,
    refreshToken
};
