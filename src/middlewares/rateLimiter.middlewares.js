import rateLimit from "express-rate-limit";

export const generalRateLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    limit: 100,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again after 15 minutes."
    },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json(options.message)
    },
    skip: (req) => {
        // health checks shouldn't consume rate-limit quota
        return req.path === '/health'
    }
})

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many authentication attempts, please try again after 15 minutes."
    },
    handler: (req, res, options) => {
        return res.status(options.statusCode).json(options.message)
    }
})