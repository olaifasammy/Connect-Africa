import 'reflect-metadata';
import { Container } from 'inversify';
export { autoDiscoverBindings } from './auto-discovery';
import { appConfig } from '@config/app';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Pool } from 'pg';
import { logger } from '@shared/logger/Logger';

import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { BcryptPasswordHasher } from '@shared/infrastructure/security/BcryptPasswordHasher';
import { JwtProvider } from '@shared/infrastructure/security/JwtProvider';

import { PostgresEntityRepository } from '@modules/entity/infrastructure/PostgresEntityRepository';
import { PostgresEntityAliasRepository } from '@modules/entity/infrastructure/persistence/PostgresEntityAliasRepository';
import { PostgresEntityVersionRepository } from '@modules/entity/infrastructure/persistence/PostgresEntityVersionRepository';
import { PostgresRevisionRepository } from '@modules/article/infrastructure/postgres/PostgresRevisionRepository';
import { EntityAliasService } from '@modules/entity/application/services/EntityAliasService';
import { EntityVersionService as ApplicationEntityVersionService } from '@modules/entity/application/services/EntityVersionService';
import { EntityService } from '@modules/entity/application/services/EntityService';
import { EntityMergeService } from '@modules/entity/domain/services/EntityMergeService';
import { EntityVersionService as DomainEntityVersionService } from '@modules/entity/domain/services/EntityVersionService';

import { OutboxDispatcher } from '@workers/OutboxDispatcher';
import { PostgresOutboxRepository } from '@shared/infrastructure/repositories/PostgresOutboxRepository';
import { PostgresUnitOfWork } from '@shared/infrastructure/database/PostgresUnitOfWork';
import { BullMqEventBus } from '@shared/infrastructure/queue/BullMqEventBus';

import Redis from 'ioredis';
import { RedisSessionRepository } from '@modules/auth/infrastructure/RedisSessionRepository';

import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';
import { RedisCacheProvider } from '@shared/infrastructure/cache/RedisCacheProvider';

import { CursorCodec } from '@shared/application/pagination/CursorCodec';

import { PostgresSearchProvider } from '@modules/search/infrastructure/search/PostgresSearchProvider';

export const container = new Container();

// Bind core infrastructure primitives
container
  .bind('PostgresProvider')
  .toService(PostgresProvider);

container
  .bind(PostgresProvider)
  .to(PostgresProvider)
  .inSingletonScope();

container
  .bind(Pool)
  .toDynamicValue(
    (context) =>
      context.container.get(PostgresProvider).pool,
  );

container
  .bind('PostgresPool')
  .toDynamicValue(
    (context) =>
      context.container.get(Pool),
  );

container
  .bind(CacheProvider)
  .to(RedisCacheProvider)
  .inSingletonScope();

container
  .bind('CacheProvider')
  .to(RedisCacheProvider)
  .inSingletonScope();

container
  .bind('Logger')
  .toConstantValue(logger);

container
  .bind('IPasswordHasher')
  .to(BcryptPasswordHasher)
  .inSingletonScope();

container
  .bind('IJwtProvider')
  .to(JwtProvider)
  .inSingletonScope();

// Cursor codec
container
  .bind(CursorCodec)
  .toDynamicValue(
    () =>
      new CursorCodec({
        secret: appConfig.pagination.cursorSecret,
      }),
  )
  .inSingletonScope();

// Redis configuration
const redisClient = new Redis({
  lazyConnect: true,
  retryStrategy: () => null,
});

redisClient.on('error', (err) => {
  logger.warn(
    'RedisClient warning:',
    err.message,
  );
});

container
  .bind<Redis>('RedisClient')
  .toConstantValue(redisClient);

if (process.env.NODE_ENV === 'test') {
  container
    .bind('IAuditLogger')
    .toConstantValue({
      log: async () => {},
    });

  container
    .bind('EventBus')
    .toConstantValue({
      publish: jest.fn(),
    });
} else {
  container
    .bind('IAuditLogger')
    .toDynamicValue(
      (context) =>
        context.container.get(AuditLogger),
    );
}

// Entity repository bindings
container
  .bind('IEntityRepository')
  .to(PostgresEntityRepository)
  .inSingletonScope();

container
  .bind('IEntityAliasRepository')
  .to(PostgresEntityAliasRepository)
  .inSingletonScope();

container
  .bind('IEntityVersionRepository')
  .to(PostgresEntityVersionRepository)
  .inSingletonScope();

container
  .bind('IRevisionRepository')
  .to(PostgresRevisionRepository)
  .inSingletonScope();


// Entity service bindings
container
  .bind('IEntityService')
  .to(EntityService)
  .inSingletonScope();

container
  .bind('IEntityMergeService')
  .to(EntityMergeService)
  .inSingletonScope();

container
  .bind('IEntityVersionService')
  .to(DomainEntityVersionService)
  .inSingletonScope();

container
  .bind('IEntityAliasService')
  .to(EntityAliasService)
  .inSingletonScope();

// Search provider binding
container
  .bind('SearchProvider')
  .to(PostgresSearchProvider)
  .inSingletonScope();

// Outbox / transaction infrastructure
container
  .bind(OutboxDispatcher)
  .toDynamicValue((context) => {
    return new OutboxDispatcher(
      context.container.get('IOutboxRepository'),
      context.container.get('EventBus'),
      context.container.get('IUnitOfWork'),
    );
  })
  .inSingletonScope();

container
  .bind('IOutboxRepository')
  .to(PostgresOutboxRepository)
  .inSingletonScope();

container
  .bind('IUnitOfWork')
  .to(PostgresUnitOfWork)
  .inSingletonScope();

if (process.env.NODE_ENV !== 'test') {
  container
    .bind('EventBus')
    .to(BullMqEventBus)
    .inSingletonScope();
}