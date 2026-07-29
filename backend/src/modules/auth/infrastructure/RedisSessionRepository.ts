import Redis from 'ioredis';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class RedisSessionRepository implements ISessionRepository {
  constructor(private redisClient: Redis) {}

  async createSession(userId: UniqueEntityId, token: string): Promise<void> {
    try {
      const key = `session:${token}`;
      await this.redisClient.set(key, userId.toString(), 'EX', 3600);
      
      AuditLogger.log({
        user: userId.toString(),
        action: 'SESSION_CREATED',
        resource: 'SESSION',
        status: 'SUCCESS'
      });
    } catch (error) {
      throw new AuthenticationError('Failed to create session');
    }
  }

  async invalidateSession(token: string): Promise<void> {
    try {
      const key = `session:${token}`;
      const userId = await this.redisClient.get(key);
      await this.redisClient.del(key);
      
      if (userId) {
        AuditLogger.log({
          user: userId,
          action: 'SESSION_INVALIDATED',
          resource: 'SESSION',
          status: 'SUCCESS'
        });
      }
    } catch (error) {
      throw new AuthenticationError('Failed to invalidate session');
    }
  }

  async listUserSessions(userId: UniqueEntityId): Promise<string[]> {
    try {
      const keys = await this.redisClient.keys('session:*');
      const sessions: string[] = [];
      for (const key of keys) {
        const val = await this.redisClient.get(key);
        if (val === userId.toString()) {
          sessions.push(key.replace('session:', ''));
        }
      }
      return sessions;
    } catch (error) {
      throw new AuthenticationError('Failed to list user sessions');
    }
  }

  async revokeAllUserSessions(userId: UniqueEntityId): Promise<void> {
    try {
      const keys = await this.redisClient.keys('session:*');
      for (const key of keys) {
        const val = await this.redisClient.get(key);
        if (val === userId.toString()) {
          await this.redisClient.del(key);
        }
      }
      
      AuditLogger.log({
        user: userId.toString(),
        action: 'ALL_SESSIONS_REVOKED',
        resource: 'SESSION',
        status: 'SUCCESS'
      });
    } catch (error) {
      throw new AuthenticationError('Failed to revoke all user sessions');
    }
  }
}
