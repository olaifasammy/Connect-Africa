import Redis from 'ioredis';
import { ISessionRepository } from '@domain/auth/repositories/ISessionRepository';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export class RedisSessionRepository implements ISessionRepository {
  constructor(private redisClient: Redis) {}

  async createSession(userId: UniqueEntityId, token: string): Promise<void> {
    const key = `session:${token}`;
    await this.redisClient.set(key, userId.toString(), 'EX', 3600);
  }

  async invalidateSession(token: string): Promise<void> {
    const key = `session:${token}`;
    await this.redisClient.del(key);
  }
}
