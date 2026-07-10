import type { SignOptions } from 'jsonwebtoken';
import { env } from './env';

export const appConfig = {
  port: parseInt(env.PORT, 10),
  nodeEnv: env.NODE_ENV,
  databaseUrl: env.DATABASE_URL,
  redisHost: env.REDIS_HOST,
  redisPort: parseInt(env.REDIS_PORT, 10),
  jwt: {
    secret: env.JWT_SECRET,
    expiration: env.JWT_EXPIRATION as SignOptions['expiresIn'],
  },
};