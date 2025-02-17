export const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err);

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorHandler;
