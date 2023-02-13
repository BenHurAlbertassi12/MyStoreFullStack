const errorHandler = (err, req, res, _next) => {
    let error = { ...err };
    error.message = err.message;

    // Log the error stack trace
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = { ...error, message: 'Resource not found' };
        error.statusCode = 404;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        error = { ...error, message: 'Validation failed' };
        error.statusCode = 400;
    }

    // JWT error
    if (err.name === 'JsonWebTokenError') {
        error = { ...error, message: 'Invalid token. Please log in again' };
        error.statusCode = 401;
    }

    res.status(error.statusCode || 500).send({
        message: error.message,
    });
};

module.exports = errorHandler;
