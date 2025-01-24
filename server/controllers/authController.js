const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working')
}


//generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

//generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};


//register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Check if name is missing
        if (!name) {
            return res.json({ error: 'Name is required.' });
        };

        //chech password is missing
        if (!password) {
            return res.json({ error: 'Password is required.' });
        };

        //check password length
        if (password.length < 6) {
            return res.json({ error: 'Password is required 6 characters.' });
        };


        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Email already registered.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        //create user in the database
        const user = await User.create({
            name, email, password: hashedPassword
        });


        return res.json(user)


    } catch (err) {
        res.status(500).json({ message: 'Error registering user.' });
    }

}


//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'User Not Found' });
        }

        //check passwords match
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            user.refreshToken = refreshToken;
            await user.save();
    
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }); 
    
            return res.status(200).json({
                message: 'Login successful',
                accessToken,
            });
        }

        if (!validPassword) {
            return res.json({ error: 'Password Incorrect' });
        }

       


    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
}


//authenticate Token
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
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing.' });

        // Verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token.' });

            // Find user in the database
            const user = await User.findById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ error: 'Refresh token does not match.' });
            }

            // Generate new access token
            const newAccessToken = generateAccessToken(user);
            res.json({ accessToken: newAccessToken });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error refreshing token.' });
    }
};

// Logout User
const logoutUser = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      // Clear refresh token in the database
      if (refreshToken) {
        const user = await User.findOne({ refreshToken });
        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      }
  
      // Clear cookie
      res.clearCookie('refreshToken', { path: '/' });
      res.json({ message: 'Logged out successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error logging out user.' });
    }
  };



module.exports = {
    test,
    registerUser,
    loginUser,
    authenticateToken,
    refreshToken,
    logoutUser
}
