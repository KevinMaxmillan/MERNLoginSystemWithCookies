import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err); 

    if (err.status >= 500) {
        logger.error(`Internal Server Error: ${err.message}`);
    } else {
        logger.warn(`${err.status} - ${err.message}`);
    }

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorHandler;

