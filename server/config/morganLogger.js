import morgan from 'morgan';
import logger from './logger.js'; 

// Create a custom Morgan format that logs via Winston
const morganLogger = morgan((tokens, req, res) => {
    const logMessage = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
       
    ].join(' ');

    // Log the HTTP request using Winston
    if (tokens.status(req, res) >= 400) {
        logger.error(logMessage);  
    } else {
        logger.info(logMessage); 
    }

    return null; 
});

export default morganLogger;
