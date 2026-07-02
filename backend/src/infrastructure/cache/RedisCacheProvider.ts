import Redis from 'ioredis';
import { CacheProvider } from './CacheProvider';
import { logger } from '@shared/logger/Logger';
import { appConfig } from '@config/app';

export class RedisCacheProvider extends CacheProvider {
  private client: Redis;

  constructor() {
    super();
    this.client = new Redis(appConfig.redisUrl);

    this.client.on('connect', () => {
      logger.info('Connected to Redis');
    });

    this.client.on('error', (err) => {
      logger.error('Redis error', err);
    });
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
