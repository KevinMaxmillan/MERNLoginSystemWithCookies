import User from '../models/user.js';
import { generateTokens } from './tokenController.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../middleware/hashedPassword.js';

// Register user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name) throw { status: 400, message: 'Name is required.' };
        if (!password) throw { status: 400, message: 'Password is required.' };
        if (password.length < 6) throw { status: 400, message: 'Password must be at least 6 characters' };

        const existingUser = await User.findOne({ email });
        if (existingUser) throw { status: 400, message: 'Email already exists.' };

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        next(err);
    }
};

// Login user
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw { status: 401, message: 'Invalid credentials' };

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

        const { accessToken, refreshToken } = await generateTokens(user);

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, path: '/' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/' });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: 'Login successful',
            accessToken
        });
    } catch (err) {
        next(err);
    }
};

// Get Profile
export const getProfile = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            throw { status: 401, message: 'Access token missing' };
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                throw { status: 403, message: 'Invalid or expired token' };
            }

            const user = await User.findById(decoded.id).select('-password -refreshToken'); 
            if (!user) {
                throw { status: 404, message: 'User not Found' };
            }

            return res.json(user);
        });
    } catch (err) {
        next(err);
    }
};

// Logout user
export const logoutUser = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies; 
        if (!refreshToken) return res.status(204).send();

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(204).send(); 

        user.refreshToken = null;
        await user.save();

        res.clearCookie("refreshToken", { httpOnly: true, secure: true, path: "/" });
        res.clearCookie("accessToken", { httpOnly: true, secure: true, path: "/" });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};
