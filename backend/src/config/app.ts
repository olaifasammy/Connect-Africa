import type { SignOptions } from 'jsonwebtoken';

import { env } from './env';

const jwtExpiration =
  env.JWT_EXPIRATION as SignOptions['expiresIn'];

const refreshExpiration =
  env.JWT_REFRESH_EXPIRATION as SignOptions['expiresIn'];

const passwordResetExpiration =
  env.JWT_PASSWORD_RESET_EXPIRATION as SignOptions['expiresIn'];

const emailVerificationExpiration =
  env.JWT_EMAIL_VERIFICATION_EXPIRATION as SignOptions['expiresIn'];

const mfaEnrollmentExpiration =
  env.MFA_ENROLLMENT_EXPIRATION;

const parseDurationToSeconds = (
  value: string,
): number => {
  const match = value.trim().match(
    /^(\d+(?:\.\d+)?)(ms|s|m|h|d|w|y)$/,
  );

  if (!match) {
    throw new Error(
      `Unsupported JWT duration: ${value}`,
    );
  }

  const amount = Number(match[1]);

  const multipliers: Record<string, number> = {
    ms: 1 / 1000,
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
    w: 7 * 24 * 60 * 60,
    y: 365 * 24 * 60 * 60,
  };

  const seconds =
    amount * multipliers[match[2]];

  if (
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    throw new Error(
      `Invalid JWT duration: ${value}`,
    );
  }

  return Math.max(
    1,
    Math.ceil(seconds),
  );
};

const accessSessionTtlSeconds =
  parseDurationToSeconds(
    env.JWT_EXPIRATION,
  );

const refreshSessionTtlSeconds =
  parseDurationToSeconds(
    env.JWT_REFRESH_EXPIRATION,
  );

const mfaEnrollmentTtlSeconds =
  parseDurationToSeconds(
    mfaEnrollmentExpiration,
  );

export const appConfig = {
  port: parseInt(
    env.PORT,
    10,
  ),

  nodeEnv:
    env.NODE_ENV,

  databaseUrl:
    env.DATABASE_URL,

  redisHost:
    env.REDIS_HOST,

  redisPort:
    parseInt(
      env.REDIS_PORT,
      10,
    ),

  jwt: {
    secret:
      env.JWT_SECRET,

    expiration:
      jwtExpiration,

    accessExpiration:
      jwtExpiration,

    accessSessionTtlSeconds,

    refreshExpiration,

    refreshSessionTtlSeconds,

    passwordResetExpiration,

    emailVerificationExpiration,

    issuer:
      'connect-africa',

    audience:
      'connect-africa-api',
  },

  mfa: {
    enrollmentTtlSeconds:
      mfaEnrollmentTtlSeconds,
  },

  pagination: {
    cursorSecret:
      env.CURSOR_SECRET,
  },
};
