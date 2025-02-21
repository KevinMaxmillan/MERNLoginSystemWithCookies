import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import logger from '../config/logger.js';

const connectDB = asyncHandler(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        logger.info('MongoDB Connected...');
    } catch (err) {
        logger.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
});

export default connectDB;
