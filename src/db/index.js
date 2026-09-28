import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { envConfig } from '../config/envConfig.js';
import { Pool } from 'pg';
import { logger } from '../config/logger.js';

export const pool = new Pool({
    connectionString: envConfig.DATABASE_URI,
    // pool configuration
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    allowExitOnIdle: false,

})

// handle unexpected errors on idle clients
pool.on("error", (error) => {
    logger.error("unexpected PostgreSQL pool error", {
        message: error.message,
        stack: error.stack,
    })
})



// You can specify any property from the node-postgres connection options
export const db = drizzle(pool);

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        try {
            await client.query("SELECT 1")
        } finally {
            client.release()
        }
        logger.info("PostgreSQL database connected successfully")
    } catch (error) {
        logger.error("PostgreSQL database connection failed", {
            message: error.message,
            stack: error.stack,
        })
        throw error;
    }
}

export const closeDB = async () => {
    try {
        await pool.end()
        logger.info("PostgreSQL database connection pool closed")
    } catch (error) {
        logger.error("Failed to close PostgreSQL connection pool", {
            message: error.message,
            stack: error.stack
        })
        throw error
    }
}