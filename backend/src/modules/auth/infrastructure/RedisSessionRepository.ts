import { createHash } from 'crypto';

import Redis from 'ioredis';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

@provide(
  'ISessionRepository',
  true,
)
@injectable()
export class RedisSessionRepository
  implements ISessionRepository
{
  private readonly sessionPrefix =
    'session:';

  private readonly userSessionPrefix =
    'user-sessions:';

  constructor(
    @inject('RedisClient')
    private readonly redisClient: Redis,
  ) {}

  async createSession(
    userId: UniqueEntityId,
    token: string,
  ): Promise<void> {
    try {
      if (
        !token ||
        token.trim() === ''
      ) {
        throw new AuthenticationError(
          'Session token is required.',
        );
      }

      const userIdValue =
        userId.toString();

      const sessionId =
        this.createSessionId(token);

      await this.redisClient.set(
        this.getSessionKey(sessionId),
        userIdValue,
        'EX',
        this.getSessionTtlSeconds(),
      );

      await this.redisClient.sadd(
        this.getUserSessionsKey(
          userIdValue,
        ),
        sessionId,
      );

      AuditLogger.log({
        user: userIdValue,
        action: 'SESSION_CREATED',
        resource: 'SESSION',
        status: 'SUCCESS',
      });
    } catch (error) {
      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to create session',
      );
    }
  }

  async getSessionUserId(
    token: string,
  ): Promise<UniqueEntityId | null> {
    try {
      if (
        !token ||
        token.trim() === ''
      ) {
        return null;
      }

      const sessionId =
        this.createSessionId(token);

      const userId =
        await this.redisClient.get(
          this.getSessionKey(sessionId),
        );

      if (!userId) {
        return null;
      }

      return new UniqueEntityId(userId);
    } catch (error) {
      throw new AuthenticationError(
        'Failed to read session',
      );
    }
  }

  async rotateSession(
    userId: UniqueEntityId,
    oldToken: string,
    newToken: string,
  ): Promise<void> {
    try {
      if (
        !oldToken ||
        oldToken.trim() === '' ||
        !newToken ||
        newToken.trim() === ''
      ) {
        throw new AuthenticationError(
          'Session tokens are required.',
        );
      }

      const userIdValue =
        userId.toString();

      const oldSessionId =
        this.createSessionId(oldToken);

      const newSessionId =
        this.createSessionId(newToken);

      const oldSessionKey =
        this.getSessionKey(oldSessionId);

      const newSessionKey =
        this.getSessionKey(newSessionId);

      const userSessionsKey =
        this.getUserSessionsKey(
          userIdValue,
        );

      const rotationScript = `
        local storedUserId = redis.call(
          'GET',
          KEYS[1]
        )

        if not storedUserId or storedUserId ~= ARGV[1] then
          return 0
        end

        redis.call(
          'SET',
          KEYS[2],
          ARGV[1],
          'EX',
          ARGV[2]
        )

        redis.call(
          'SADD',
          KEYS[3],
          ARGV[4]
        )

        redis.call(
          'DEL',
          KEYS[1]
        )

        redis.call(
          'SREM',
          KEYS[3],
          ARGV[3]
        )

        return 1
      `;

      const result =
        await this.redisClient.eval(
          rotationScript,
          3,
          oldSessionKey,
          newSessionKey,
          userSessionsKey,
          userIdValue,
          String(
            this.getSessionTtlSeconds(),
          ),
          oldSessionId,
          newSessionId,
        );

      if (result !== 1) {
        throw new AuthenticationError(
          'Refresh session is invalid or has been revoked.',
        );
      }

      AuditLogger.log({
        user: userIdValue,
        action: 'SESSION_ROTATED',
        resource: 'SESSION',
        status: 'SUCCESS',
      });
    } catch (error) {
      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to rotate session',
      );
    }
  }

  async invalidateSession(
    userId: UniqueEntityId,
    token: string,
  ): Promise<void> {
    try {
      if (
        !token ||
        token.trim() === ''
      ) {
        return;
      }

      const userIdValue =
        userId.toString();

      const sessionId =
        this.createSessionId(token);

      const sessionKey =
        this.getSessionKey(sessionId);

      const storedUserId =
        await this.redisClient.get(
          sessionKey,
        );

      if (
        !storedUserId ||
        storedUserId !== userIdValue
      ) {
        throw new AuthenticationError(
          'Session not found.',
        );
      }

      await this.invalidateSessionId(
        sessionId,
      );
    } catch (error) {
      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to invalidate session',
      );
    }
  }

  async invalidateSessionById(
    userId: UniqueEntityId,
    sessionId: string,
  ): Promise<void> {
    try {
      if (
        !sessionId ||
        sessionId.trim() === ''
      ) {
        throw new AuthenticationError(
          'Session ID is required.',
        );
      }

      const userIdValue =
        userId.toString();

      const sessionKey =
        this.getSessionKey(sessionId);

      const storedUserId =
        await this.redisClient.get(
          sessionKey,
        );

      if (
        !storedUserId ||
        storedUserId !== userIdValue
      ) {
        throw new AuthenticationError(
          'Session not found.',
        );
      }

      await this.invalidateSessionId(
        sessionId,
      );
    } catch (error) {
      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to invalidate session',
      );
    }
  }

  async listUserSessions(
    userId: UniqueEntityId,
  ): Promise<string[]> {
    try {
      const userIdValue =
        userId.toString();

      const userSessionsKey =
        this.getUserSessionsKey(
          userIdValue,
        );

      const sessionIds =
        await this.redisClient.smembers(
          userSessionsKey,
        );

      if (sessionIds.length === 0) {
        return [];
      }

      const pipeline =
        this.redisClient.pipeline();

      for (
        const sessionId of sessionIds
      ) {
        pipeline.exists(
          this.getSessionKey(sessionId),
        );
      }

      const results =
        await pipeline.exec();

      const activeSessions: string[] = [];
      const staleSessions: string[] = [];

      for (
        let index = 0;
        index < sessionIds.length;
        index += 1
      ) {
        const result =
          results?.[index];

        const exists =
          result &&
          result[1] === 1;

        if (exists) {
          activeSessions.push(
            sessionIds[index],
          );
        } else {
          staleSessions.push(
            sessionIds[index],
          );
        }
      }

      if (staleSessions.length > 0) {
        await this.redisClient.srem(
          userSessionsKey,
          ...staleSessions,
        );
      }

      return activeSessions;
    } catch (error) {
      throw new AuthenticationError(
        'Failed to list user sessions',
      );
    }
  }

  async revokeAllUserSessions(
    userId: UniqueEntityId,
  ): Promise<void> {
    try {
      const userIdValue =
        userId.toString();

      const userSessionsKey =
        this.getUserSessionsKey(
          userIdValue,
        );

      const sessionIds =
        await this.redisClient.smembers(
          userSessionsKey,
        );

      if (sessionIds.length > 0) {
        const pipeline =
          this.redisClient.pipeline();

        for (
          const sessionId of sessionIds
        ) {
          pipeline.del(
            this.getSessionKey(sessionId),
          );
        }

        await pipeline.exec();
      }

      await this.redisClient.del(
        userSessionsKey,
      );

      AuditLogger.log({
        user: userIdValue,
        action: 'ALL_SESSIONS_REVOKED',
        resource: 'SESSION',
        status: 'SUCCESS',
      });
    } catch (error) {
      throw new AuthenticationError(
        'Failed to revoke all user sessions',
      );
    }
  }

  private async invalidateSessionId(
    sessionId: string,
  ): Promise<void> {
    const sessionKey =
      this.getSessionKey(sessionId);

    const userId =
      await this.redisClient.get(
        sessionKey,
      );

    await this.redisClient.del(
      sessionKey,
    );

    if (userId) {
      await this.redisClient.srem(
        this.getUserSessionsKey(userId),
        sessionId,
      );

      AuditLogger.log({
        user: userId,
        action: 'SESSION_INVALIDATED',
        resource: 'SESSION',
        status: 'SUCCESS',
      });
    }
  }

  private getSessionTtlSeconds(): number {
    return this.getAppConfig()
      .jwt
      .refreshSessionTtlSeconds;
  }

  private getAppConfig() {
    // Lazy import avoids introducing a module initialization
    // cycle between configuration and infrastructure.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('@config/app').appConfig;
  }

  private createSessionId(
    token: string,
  ): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }

  private getSessionKey(
    sessionId: string,
  ): string {
    return `${this.sessionPrefix}${sessionId}`;
  }

  private getUserSessionsKey(
    userId: string,
  ): string {
    return `${this.userSessionPrefix}${userId}`;
  }
}
