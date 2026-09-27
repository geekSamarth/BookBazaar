const logger = require("../config/logger");

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const message =
        statusCode === 500
            ? "Internal Server Error"
            : err.message || "Something went wrong";

    // Log complete error internally
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        statusCode,
        userId: req.user?.id || null,
    });

    const response = {
        success: false,
        message,
    };

    // Include validation/custom errors if available
    if (err.errors) {
        response.errors = err.errors;
    }

    // Only expose stack during development
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};
