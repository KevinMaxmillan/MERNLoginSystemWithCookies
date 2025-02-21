import User from '../models/user.js';
import { generateTokens } from './tokenController.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { hashPassword, comparePassword } from '../middleware/hashedPassword.js';

// Register user
export const registerUser = asyncHandler(async (req, res, next) => {
    
        const { name, email, password } = req.body;

        if (!name) throw { status: 400, message: 'Name is required.' };
        if (!password) throw { status: 400, message: 'Password is required.' };
        if (password.length < 6) throw { status: 400, message: 'Password must be at least 6 characters' };

        const existingUser = await User.findOne({ email });
        if (existingUser) throw { status: 400, message: 'Email already exists.' };

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: 'User registered successfully', user });
    
});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
   
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw { status: 401, message: 'Invalid credentials' };

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

        const { accessToken, refreshToken } = await generateTokens(user);

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, path: '/' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/' });

        return res.status(200).json({
            message: 'Login successful',
            accessToken
        });
    
});

// Get Profile
export const getProfile = asyncHandler(async (req, res, next) => {
   
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
   
});

// Logout user
export const logoutUser = asyncHandler(async (req, res, next) => {

        res.clearCookie("refreshToken", { httpOnly: true, secure: true, path: "/" });
        res.clearCookie("accessToken", { httpOnly: true, secure: true, path: "/" });

        res.status(200).json({ message: "Logged out successfully" });
   
});
