// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    // Log error to console for debugging
    console.error('ERROR:', err);

    // Default error status
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Send error response
    res.status(status).json({
        success: false,
        status: status,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err : {}
        // Only show full error details in development mode
    });
};

module.exports = errorHandler;