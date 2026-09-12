import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { randomUUID } from 'crypto';

import {
  IJwtProvider,
  JwtTokenType,
} from '@modules/auth/domain/interfaces/IJwtProvider';

import { appConfig } from '@config/app';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

interface JwtClaims {
  readonly sub: string;
  readonly jti: string;
  readonly tokenType: JwtTokenType;
  readonly iat?: number;
  readonly exp?: number;
  readonly iss?: string;
  readonly aud?: string | string[];
}

@injectable()
export class JwtProvider
  implements IJwtProvider
{
  private readonly secret =
    appConfig.jwt.secret;

  generateToken(
    userId: string,
    tokenType: JwtTokenType,
  ): string {
    if (
      typeof userId !== 'string' ||
      userId.trim() === ''
    ) {
      throw new AuthenticationError(
        'User ID is required to generate a token.',
      );
    }

    const expiration =
      this.getExpiration(
        tokenType,
      );

    const token =
      jwt.sign(
        {
          sub: userId,
          jti: randomUUID(),
          tokenType,
        },
        this.secret,
        {
          expiresIn:
            expiration,
          issuer:
            appConfig.jwt.issuer,
          audience:
            appConfig.jwt.audience,
          algorithm:
            'HS256',
        },
      );

    AuditLogger.log({
      user: userId,
      action: 'TOKEN_GENERATION',
      resource: tokenType,
      status: 'SUCCESS',
    });

    return token;
  }

  verifyToken(
    token: string,
    expectedTokenType?: JwtTokenType,
  ): string {
    try {
      if (
        typeof token !== 'string' ||
        token.trim() === ''
      ) {
        throw new AuthenticationError(
          'Token is required.',
        );
      }

      const decoded =
        jwt.verify(
          token,
          this.secret,
          {
            algorithms: ['HS256'],
            issuer:
              appConfig.jwt.issuer,
            audience:
              appConfig.jwt.audience,
          },
        ) as JwtClaims;

      if (
        !decoded ||
        typeof decoded.sub !== 'string' ||
        decoded.sub.trim() === ''
      ) {
        throw new AuthenticationError(
          'Token subject is invalid.',
        );
      }

      if (
        !this.isJwtTokenType(
          decoded.tokenType,
        )
      ) {
        throw new AuthenticationError(
          'Token type is invalid.',
        );
      }

      if (
        expectedTokenType &&
        decoded.tokenType !==
          expectedTokenType
      ) {
        throw new AuthenticationError(
          'Token type is not valid for this operation.',
        );
      }

      if (
        typeof decoded.jti !== 'string' ||
        decoded.jti.trim() === ''
      ) {
        throw new AuthenticationError(
          'Token identifier is invalid.',
        );
      }

      AuditLogger.log({
        user: decoded.sub,
        action: 'TOKEN_VERIFICATION',
        resource: decoded.tokenType,
        status: 'SUCCESS',
      });

      return decoded.sub;
    } catch (error) {
      AuditLogger.log({
        user: 'UNKNOWN',
        action: 'TOKEN_VERIFICATION',
        resource:
          expectedTokenType ??
          'AUTH',
        status: 'FAILURE',
      });

      if (
        error instanceof AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Invalid or expired token.',
      );
    }
  }

  private getExpiration(
    tokenType: JwtTokenType,
  ): SignOptions['expiresIn'] {
    switch (tokenType) {
      case 'ACCESS':
        return appConfig.jwt
          .accessExpiration;

      case 'REFRESH':
        return appConfig.jwt
          .refreshExpiration;

      case 'PASSWORD_RESET':
        return appConfig.jwt
          .passwordResetExpiration;

      case 'EMAIL_VERIFICATION':
        return appConfig.jwt
          .emailVerificationExpiration;

      default:
        return appConfig.jwt
          .accessExpiration;
    }
  }

  private isJwtTokenType(
    value: unknown,
  ): value is JwtTokenType {
    return (
      value === 'ACCESS' ||
      value === 'REFRESH' ||
      value === 'PASSWORD_RESET' ||
      value === 'EMAIL_VERIFICATION'
    );
  }
}