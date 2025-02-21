import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import morganLogger from './config/morganLogger.js'; 
import logger from './config/logger.js';
import corsOptions from './config/corsConfig.js';

connectDB();


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(morganLogger);

// Routes
app.use('/', authRoutes);

// 404 Not Found Handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

//issues

//refreshtoken saved in the database ==> in the case of restart the server it is authorized and logged in. 
//shows the logout button.
//directly not loading the profle page
