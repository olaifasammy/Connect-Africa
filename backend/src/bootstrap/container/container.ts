import { Container } from 'inversify';
import 'reflect-metadata';
import { PostgresEntityRepository } from '@modules/entity/infrastructure/PostgresEntityRepository';
import { CreateEntityCommandHandler } from '@modules/entity/application/handlers/CreateEntityCommandHandler';
import { EntityController } from '@modules/entity/interfaces/EntityController';
import { PostgresRelationshipRepository } from '@modules/relationship/infrastructure/repositories/PostgresRelationshipRepository';
import { CreateRelationshipHandler } from '@modules/relationship/application/handlers/CreateRelationshipHandler';
import { PostgresUserSettingsRepository } from '@modules/settings/infrastructure/PostgresUserSettingsRepository';
import { RelationshipController } from '@modules/relationship/interfaces/controllers/RelationshipController';
import { RelationshipService } from '@modules/relationship/application/services/RelationshipService';
import { RelationshipValidationService } from '@modules/relationship/domain/services/RelationshipValidationService';
import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { OntologyService } from '@modules/ontology/application/services/OntologyService';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { PostgresOntologyRepository } from '@modules/ontology/infrastructure/PostgresOntologyRepository';
import { PrometheusMetricsProvider } from '@shared/infrastructure/monitoring/PrometheusMetricsProvider';
import { PostgresUserRepository } from '@modules/auth/infrastructure/PostgresUserRepository';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { LoginCommandHandler } from '@modules/auth/application/handlers/LoginCommandHandler';
import { RegisterUserCommandHandler } from '@modules/auth/application/handlers/RegisterUserCommandHandler';
import { BcryptPasswordHasher } from '@shared/infrastructure/security/BcryptPasswordHasher';
import { JwtProvider } from '@shared/infrastructure/security/JwtProvider';
import { BullMqEventBus } from '@shared/infrastructure/queue/BullMqEventBus';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { RedisSessionRepository } from '@modules/auth/infrastructure/RedisSessionRepository';
import { Pool } from 'pg';
import Redis from 'ioredis';

export const container = new Container();

// Database/Infrastructure
const pool = PostgresProvider.getPool();
container.bind(Pool).toConstantValue(pool);
container.bind(PostgresProvider).toSelf();
container.bind<IAuditRepository>('IAuditRepository').toDynamicValue((context) => {
    return new PostgresAuditRepository(context.container.get(Pool));
}).inSingletonScope();
container.bind('IUserRepository').to(PostgresUserRepository);
container.bind('ISessionRepository').to(RedisSessionRepository);
container.bind('IPasswordHasher').to(BcryptPasswordHasher);
container.bind('IJwtProvider').to(JwtProvider);
if (process.env.NODE_ENV === 'test') {
  container.bind('EventBus').toConstantValue({ publish: jest.fn() });
} else {
  container.bind('EventBus').to(BullMqEventBus);
}

import { GetCurrentUserQueryHandler } from '@modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
// ... (previous imports)

// Auth
container.bind(LoginCommandHandler).toSelf();
container.bind(GetCurrentUserQueryHandler).toDynamicValue((context) => {
    return new GetCurrentUserQueryHandler(
        context.container.get('IUserRepository')
    );
});
container.bind(AuthenticationMiddleware).toDynamicValue((context) => {
    return new AuthenticationMiddleware(
        context.container.get('IJwtProvider'),
        context.container.get(GetCurrentUserQueryHandler)
    );
});
container.bind(RegisterUserCommandHandler).toDynamicValue((context) => {
    return new RegisterUserCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('IPasswordHasher'),
        context.container.get('EventBus')
    );
});
container.bind(LogoutCommandHandler).toSelf();
container.bind(RefreshCommandHandler).toSelf();
container.bind(ResetPasswordCommandHandler).toDynamicValue((context) => {
    return new ResetPasswordCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('IPasswordHasher'),
        context.container.get('EventBus')
    );
});
container.bind(AuthController).toDynamicValue((context) => {
  return new AuthController(
    context.container.get(LoginCommandHandler),
    context.container.get(LogoutCommandHandler),
    context.container.get(RefreshCommandHandler),
    context.container.get(RegisterUserCommandHandler),
    context.container.get(ResetPasswordCommandHandler)
  );
});

// Ontology
container.bind('IOntologyRepository').to(PostgresOntologyRepository);
container.bind(UniqueOntologyPolicy).toSelf();
container.bind(OntologyService).toSelf();
container.bind(CreateOntologyCommandHandler).toSelf();
container.bind(OntologyController).toSelf();
container.bind('IMetricsProvider').to(PrometheusMetricsProvider).inSingletonScope();

// Entity
container.bind('IEntityRepository').to(PostgresEntityRepository);
container.bind(CreateEntityCommandHandler).toDynamicValue((context) => {
    return new CreateEntityCommandHandler(
        context.container.get('IEntityRepository'),
        context.container.get<IAuditRepository>('IAuditRepository'),
        context.container.get('EventBus')
    );
});
container.bind(EntityController).toSelf();

// Settings
container.bind('ISettingsRepository').toDynamicValue((context) => {
    return new PostgresUserSettingsRepository(context.container.get(PostgresProvider));
});

// Relationship
container.bind('IRelationshipRepository').toDynamicValue((context) => {
    return new PostgresRelationshipRepository(context.container.get(PostgresProvider));
});
container.bind('IOntologyService').toConstantValue({ validateRelationshipType: async () => {} });
container.bind('IAuditLogger').toConstantValue({ log: async () => {} }); // Should be bound to a real audit service
container.bind(CreateRelationshipHandler).toDynamicValue((context) => {
    return new CreateRelationshipHandler(
        context.container.get('IRelationshipRepository'),
        context.container.get('IOntologyService'),
        context.container.get('IAuditLogger'),
        context.container.get('EventBus')
    );
});
container.bind(RelationshipService).toDynamicValue((context) => {
    return new RelationshipService(
        context.container.get('IRelationshipRepository'),
        context.container.get(RelationshipValidationService),
        context.container.get('EventBus')
    );
});
container.bind(RelationshipController).toSelf();
