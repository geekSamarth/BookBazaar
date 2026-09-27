import winston from 'winston'
import { envConfig } from './envConfig.js';

const { combine, timestamp, errors, json, colorize, simple } = winston.format;

const isProduction = envConfig.NODE_ENV === "production";

export const logger = winston.createLogger({
    level: envConfig.LOG_LEVEL || "info",

    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
    ),

    transports: [
        new winston.transports.Console({
            format: isProduction
                ? combine(timestamp(), errors({ stack: true }), json())
                : combine(
                    colorize(),
                    timestamp(),
                    errors({ stack: true }),
                    simple()
                ),
        }),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),

        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],

    exitOnError: false,
});
