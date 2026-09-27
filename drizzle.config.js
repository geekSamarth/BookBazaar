import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { envConfig } from './src/config/envConfig.js';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: envConfig.DATABASE_URI,
  },
});
