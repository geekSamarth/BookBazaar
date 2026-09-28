import app from './app.js';
import { envConfig as env } from './config/envConfig.js';
import { logger } from './config/logger.js'
import { connectDB, closeDB } from './db/index.js';

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(env.PORT, () => {
      logger.info(`BookBazaar API running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Application startup failed", {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
};

const shutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  try {
    if (server) {
      server.close(() => {
        logger.info("HTTP server closed");
      });
    }

    await closeDB();

    process.exit(0);
  } catch (error) {
    logger.error("Graceful shutdown failed", {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();