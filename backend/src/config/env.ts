import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string().default('1h'),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  REDIS_URL: `redis://${parsedEnv.REDIS_HOST}:${parsedEnv.REDIS_PORT}`,
};
