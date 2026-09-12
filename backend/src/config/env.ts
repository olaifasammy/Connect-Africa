import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum([
    'development',
    'production',
    'test',
  ]).default('development'),

  DATABASE_URL: z.string().url(),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string().default('1h'),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),
  JWT_PASSWORD_RESET_EXPIRATION: z.string().default('15m'),
  JWT_EMAIL_VERIFICATION_EXPIRATION: z.string().default('24h'),
  MFA_ENROLLMENT_EXPIRATION: z.string().default('10m'),

  CURSOR_SECRET: z.string().min(32),

  OUTBOX_POLLING_INTERVAL: z.string().default('5000'),
  OUTBOX_BATCH_SIZE: z.string().default('50'),
});

let parsedEnv;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      '❌ Invalid environment configuration:',
    );

    error.issues.forEach(
      (issue: z.ZodIssue) => {
        console.error(
          `  - Field: ${issue.path.join('.')} | Error: ${issue.message}`,
        );
      },
    );

    process.exit(1);
  }

  throw error;
}

export const env = {
  ...parsedEnv,
  REDIS_URL:
    `redis://${parsedEnv.REDIS_HOST}:${parsedEnv.REDIS_PORT}`,
};