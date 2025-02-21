import winston from 'winston';
import colors from 'colors';

class Logger {
    constructor() {
        if (!Logger.instance) {
           
            const logFormat = winston.format.printf(({ level, message, timestamp }) => {
                const colorizedTimestamp = colors.cyan(timestamp);
                const colorizedLevel = level === 'info' ? colors.green(level.toUpperCase()) :
                                       level === 'warn' ? colors.yellow(level.toUpperCase()) :
                                       level === 'error' ? colors.red(level.toUpperCase()) :
                                       colors.white(level.toUpperCase());

                return `${colorizedTimestamp} [${colorizedLevel}] ${colors.magenta(message)}`;
            });

            // Create the logger instance
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    logFormat
                ),
                transports: [
                    new winston.transports.Console(),
                    //new winston.transports.File({ filename: 'logs/app.log' }) 
                ]
            });

            Logger.instance = this;
        }
        return Logger.instance;
    }


    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }
}


const logger = new Logger();
export default logger;
