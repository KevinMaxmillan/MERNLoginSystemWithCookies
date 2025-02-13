const User = require('../models/user');
const bcrypt = require('bcrypt');
const TokenController = require('./tokenController');
const jwt = require('jsonwebtoken');  


// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

  
        if (!name) return res.json({ error: 'Name is required.' });

 
        if (!password) return res.json({ error: 'Password is required.' });

 
        if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters.' });

    
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({ error: 'Email already registered.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashedPassword
        });

        return res.json(user);

    } catch (err) {
        res.status(500).json({ message: 'Error registering user.' });
    }
}

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ email });
        if (!user) return res.json({ error: 'User Not Found' });

   
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.json({ error: 'Password Incorrect' });

        const { accessToken, refreshToken } = await TokenController.generateTokens(user);

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, path: '/' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/' });

        // user.refreshToken = refreshToken;
        // await user.save();

        return res.status(200).json({
            message: 'Login successful',
            accessToken
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
}

const getProfile = async (req, res) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(401).json({ error: 'Access token missing.' });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or expired token.' });
            }

            
            const user = await User.findById(decoded.id).select('-password -refreshToken'); 
            
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.json(user);
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies; 
        if (!refreshToken) return res.status(204).send();

     
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(204).send(); 

       
        // user.refreshToken = null;
        // await user.save();

      
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, path: "/" });
        res.clearCookie("accessToken", { httpOnly: true, secure: true, path: "/" });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ error: "Error logging out" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}
