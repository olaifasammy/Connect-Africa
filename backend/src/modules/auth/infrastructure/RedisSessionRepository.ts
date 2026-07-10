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
}
