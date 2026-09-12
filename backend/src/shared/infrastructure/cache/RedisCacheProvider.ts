import { injectable } from 'inversify';
import Redis from 'ioredis';
import { CacheProvider } from './CacheProvider';
import { logger } from '@shared/logger/Logger';
import { appConfig } from '@config/app';

@injectable()
export class RedisCacheProvider extends CacheProvider {
  private client: Redis;

  constructor() {
    super();

    this.client = new Redis({
      host: appConfig.redisHost,
      port: appConfig.redisPort,
      lazyConnect: true,
      retryStrategy: () => null,
    });

    this.client.on('error', (err) => {
      logger.warn(
        'Redis cache warning (degraded mode):',
        err.message,
      );
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  async set(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {
    try {
      if (ttl) {
        await this.client.set(key, value, 'EX', ttl);
      } else {
        await this.client.set(key, value);
      }
    } catch {
      // Ignore cache failures in degraded mode.
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.ping();
      return true;
    } catch (err) {
      logger.warn(
        'Redis health check failed (degraded mode):',
        err,
      );

      return false;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch {
      // Ignore cache failures in degraded mode.
    }
  }
}
