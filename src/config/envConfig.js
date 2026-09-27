import dotenv from "dotenv";
import { z } from 'zod'
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(5000),

    DATABASE_URI: z
        .string()
        .min(1, "DATABASE_URL is required"),

    JWT_ACCESS_TOKEN_SECRET: z
        .string()
        .min(32, "JWT_ACCESS_TOKEN_SECRET must be at least 32 characters"),

    JWT_ACCESS_TOKEN_EXPIRY: z.string().default("15m"),

    JWT_REFRESH_TOKEN_SECRET: z
        .string()
        .min(32, "JWT_REFRESH_TOKEN_SECRET must be at least 32 characters"),

    JWT_REFRESH_TOKEN_EXPIRY: z.string().default("7d"),

    LOG_LEVEL: z
        .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
        .default("info"),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),

    CORS_ORIGIN: z
        .string()
        .default("http://localhost:3000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:");

    console.error(
        parsedEnv.error.flatten().fieldErrors
    );

    process.exit(1);
}

export const envConfig = parsedEnv.data;
