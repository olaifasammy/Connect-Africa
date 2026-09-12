import Redis from 'ioredis';
import {
  inject,
  injectable,
} from 'inversify';
import {
  provide,
} from 'inversify-binding-decorators';

import {
  IMfaEnrollmentRepository,
} from '@modules/auth/domain/repositories/IMfaEnrollmentRepository';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  appConfig,
} from '@config/app';

@provide(
  'IMfaEnrollmentRepository',
  true,
)
@injectable()
export class RedisMfaEnrollmentRepository
  implements IMfaEnrollmentRepository
{
  private readonly prefix =
    'mfa-enrollment:';

  constructor(
    @inject('RedisClient')
    private readonly redisClient: Redis,
  ) {}

  async save(
    userId: UniqueEntityId,
    secret: string,
  ): Promise<void> {
    if (
      !secret ||
      secret.trim() === ''
    ) {
      throw new Error(
        'MFA enrollment secret is required.',
      );
    }

    await this.redisClient.set(
      this.key(userId),
      secret.trim(),
      'EX',
      appConfig.mfa.enrollmentTtlSeconds,
    );
  }

  async get(
    userId: UniqueEntityId,
  ): Promise<string | null> {
    return this.redisClient.get(
      this.key(userId),
    );
  }

  async remove(
    userId: UniqueEntityId,
  ): Promise<void> {
    await this.redisClient.del(
      this.key(userId),
    );
  }

  private key(
    userId: UniqueEntityId,
  ): string {
    return `${this.prefix}${userId.toString()}`;
  }
}
