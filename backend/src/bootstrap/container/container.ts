import { ActivateAccountCommandHandler } from '@modules/auth/application/handlers/ActivateAccountCommandHandler';
import { ChangePasswordCommandHandler } from '@modules/auth/application/handlers/ChangePasswordCommandHandler';
import { DeleteAccountCommandHandler } from '@modules/auth/application/handlers/DeleteAccountCommandHandler';
import { ChangeEmailCommandHandler } from '@modules/auth/application/handlers/ChangeEmailCommandHandler';
import { UnbanUserCommandHandler } from '@modules/auth/application/handlers/UnbanUserCommandHandler';
import { OutboxDispatcher } from '@workers/OutboxDispatcher';
import { PostgresUnitOfWork } from '@shared/infrastructure/database/PostgresUnitOfWork';
import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';
import { IOutboxRepository } from '@shared/domain/repositories/IOutboxRepository';
import { PostgresOutboxRepository } from '@shared/infrastructure/repositories/PostgresOutboxRepository';
import { Container } from 'inversify';
import 'reflect-metadata';
import Redis from 'ioredis';
import { env } from '@config/env';
import { GeminiProvider } from '@modules/ai/infrastructure/providers/GeminiProvider';
import { ProviderRegistry } from '@modules/ai/infrastructure/providers/ProviderRegistry';
import { ProviderSelectionService } from '@modules/ai/domain/services/ProviderSelectionService';
import { AIGatewayService } from '@modules/ai/application/services/AIGatewayService';
import { PostgresProviderRepository } from '@modules/ai/infrastructure/repositories/PostgresProviderRepository';
import { ExpansionRequestService } from '@modules/ai/application/services/ExpansionRequestService';
import { OntologySuggestionService } from '@modules/ai/application/services/OntologySuggestionService';
import { ProcessAiRequestHandler } from '@modules/ai/application/handlers/ProcessAiRequestHandler';
import { AiController } from '@modules/ai/interfaces/controllers/AiController';
import { PostgresEntityRepository } from '@modules/entity/infrastructure/PostgresEntityRepository';
import { CreateEntityCommandHandler } from '@modules/entity/application/handlers/CreateEntityCommandHandler';
import { AddAliasCommandHandler } from '@modules/entity/application/handlers/AddAliasCommandHandler';
import { ArchiveEntityCommandHandler } from '@modules/entity/application/handlers/ArchiveEntityCommandHandler';
import { CreateEntityVersionCommandHandler } from '@modules/entity/application/handlers/CreateEntityVersionCommandHandler';
import { DeleteEntityCommandHandler } from '@modules/entity/application/handlers/DeleteEntityCommandHandler';
import { GetEntityByIdentifierQueryHandler } from '@modules/entity/application/handlers/GetEntityByIdentifierQueryHandler';
import { GetEntityBySlugQueryHandler } from '@modules/entity/application/handlers/GetEntityBySlugQueryHandler';
import { GetEntityQueryHandler } from '@modules/entity/application/handlers/GetEntityQueryHandler';
import { GetEntityVersionQueryHandler } from '@modules/entity/application/handlers/GetEntityVersionQueryHandler';
import { ListAliasesQueryHandler } from '@modules/entity/application/handlers/ListAliasesQueryHandler';
import { ListEntitiesQueryHandler } from '@modules/entity/application/handlers/ListEntitiesQueryHandler';
import { MergeEntitiesCommandHandler } from '@modules/entity/application/handlers/MergeEntitiesCommandHandler';
import { PublishEntityCommandHandler } from '@modules/entity/application/handlers/PublishEntityCommandHandler';
import { RemoveAliasCommandHandler } from '@modules/entity/application/handlers/RemoveAliasCommandHandler';
import { RestoreEntityCommandHandler } from '@modules/entity/application/handlers/RestoreEntityCommandHandler';
import { SearchEntitiesQueryHandler } from '@modules/entity/application/handlers/SearchEntitiesQueryHandler';
import { UpdateEntityCommandHandler } from '@modules/entity/application/handlers/UpdateEntityCommandHandler';
import { EntityController } from '@modules/entity/interfaces/EntityController';
import { PostgresRelationshipRepository } from '@modules/relationship/infrastructure/repositories/PostgresRelationshipRepository';
import { CreateRelationshipHandler } from '@modules/relationship/application/handlers/CreateRelationshipHandler';
import { EnableMfaCommandHandler } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';
import { PreferenceService, DeliveryService } from '@modules/notification/public';
import { PostgresNotificationRepository } from '@modules/notification/infrastructure/repositories/PostgresNotificationRepository';
import { RelationshipController } from '@modules/relationship/interfaces/controllers/RelationshipController';
import { OntologyIntegrationService } from '@modules/relationship/infrastructure/services/OntologyIntegrationService';
import { RelationshipService } from '@modules/relationship/application/services/RelationshipService';
import { IOntologyService } from '@modules/relationship/domain/interfaces/RelationshipServices';
import { CardinalityPolicy } from '@modules/relationship/domain/policies/CardinalityPolicy';
import { CircularRelationshipPolicy } from '@modules/relationship/domain/policies/CircularRelationshipPolicy';
import { DuplicateRelationshipPolicy } from '@modules/relationship/domain/policies/DuplicateRelationshipPolicy';
import { TemporalValidityPolicy } from '@modules/relationship/domain/policies/TemporalValidityPolicy';
import { RelationshipValidationService } from '@modules/relationship/domain/services/RelationshipValidationService';
import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { OntologyService } from '@modules/ontology/application/services/OntologyService';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { PostgresOntologyRepository } from '@modules/ontology/infrastructure/PostgresOntologyRepository';
import { PostgresEntityTypeRepository } from '@modules/ontology/infrastructure/PostgresEntityTypeRepository';
import { EntityTypeService } from '@modules/ontology/application/services/EntityTypeService';
import { EntityTypeValidator } from '@modules/ontology/domain/validators/EntityTypeValidator';
import { PostgresRelationshipTypeRepository } from '@modules/ontology/infrastructure/PostgresRelationshipTypeRepository';
import { PostgresOntologyVersionRepository } from '@modules/ontology/infrastructure/PostgresOntologyVersionRepository';
import { PrometheusMetricsProvider } from '@shared/infrastructure/monitoring/PrometheusMetricsProvider';
import { PostgresUserRepository } from '@modules/auth/infrastructure/PostgresUserRepository';
import { PostgresUserProfileRepository } from '@modules/auth/infrastructure/PostgresUserProfileRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { IAuditRepository } from '@modules/audit/public';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { LoginCommandHandler } from '@modules/auth/application/handlers/LoginCommandHandler';
import { RegisterUserCommandHandler } from '@modules/auth/application/handlers/RegisterUserCommandHandler';
import { BcryptPasswordHasher } from '@shared/infrastructure/security/BcryptPasswordHasher';
import { JwtProvider } from '@shared/infrastructure/security/JwtProvider';
import { TotpProvider } from '@shared/infrastructure/security/TotpProvider';
import { BullMqEventBus } from '@shared/infrastructure/queue/BullMqEventBus';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { VerifyEmailCommandHandler } from '@modules/auth/application/handlers/VerifyEmailCommandHandler';
import { UpdateProfileCommandHandler } from '@modules/auth/application/handlers/UpdateProfileCommandHandler';
import { BanUserCommandHandler } from '@modules/auth/application/handlers/BanUserCommandHandler';
import { SuspendUserCommandHandler } from '@modules/auth/application/handlers/SuspendUserCommandHandler';
import { RestoreAccountCommandHandler } from '@modules/auth/application/handlers/RestoreAccountCommandHandler';
import { AssignRoleCommandHandler } from '@modules/auth/application/handlers/AssignRoleCommandHandler';
import { RemoveRoleCommandHandler } from '@modules/auth/application/handlers/RemoveRoleCommandHandler';
import { DisableAccountCommandHandler } from '@modules/auth/application/handlers/DisableAccountCommandHandler';
import { ListUsersQueryHandler } from '@modules/auth/application/handlers/queries/ListUsersQueryHandler';
import { SearchUsersQueryHandler } from '@modules/auth/application/handlers/queries/SearchUsersQueryHandler';
import { ListUserSessionsQueryHandler } from '@modules/auth/application/handlers/queries/ListUserSessionsQueryHandler';
import { RevokeAllUserSessionsCommandHandler } from '@modules/auth/application/handlers/RevokeAllUserSessionsCommandHandler';
import { UnlockUserCommandHandler } from '@modules/auth/application/handlers/UnlockUserCommandHandler';
import { EnableAccountCommandHandler } from '@modules/auth/application/handlers/EnableAccountCommandHandler';
import { RevokeSessionCommandHandler } from '@modules/auth/application/handlers/RevokeSessionCommandHandler';
import { RedisSessionRepository } from '@modules/auth/infrastructure/RedisSessionRepository';
import { Pool } from 'pg';
import { PostgresGraphRepository } from '@modules/graph/public';
import { AddBookmarkCommandHandler } from '@modules/article/application/handlers/AddBookmarkCommandHandler';
import { AddToReadingHistoryCommandHandler } from '@modules/article/application/handlers/AddToReadingHistoryCommandHandler';
import { UpdateReadingProgressCommandHandler } from '@modules/article/application/handlers/UpdateReadingProgressCommandHandler';
import { GetBookmarksQueryHandler } from '@modules/article/application/handlers/queries/GetBookmarksQueryHandler';
import { GetReadingHistoryQueryHandler } from '@modules/article/application/handlers/queries/GetReadingHistoryQueryHandler';
import { CreateGraphNodeHandler } from '@modules/graph/public';
import { CreateGraphEdgeHandler, UpdateGraphNodeHandler, DeleteGraphNodeHandler, UpdateGraphEdgeHandler, DeleteGraphEdgeHandler } from '@modules/graph/public';
import { CreateArticleHandler } from '@modules/article/application/handlers/CreateArticleHandler';
import { UpdateArticleHandler } from '@modules/article/application/handlers/UpdateArticleHandler';
import { DeleteArticleHandler } from '@modules/article/application/handlers/DeleteArticleHandler';
import { PublishArticleHandler } from '@modules/article/application/handlers/PublishArticleHandler';
import { ArchiveArticleHandler } from '@modules/article/application/handlers/ArchiveArticleHandler';
import { SubmitForReviewHandler } from '@modules/article/application/handlers/SubmitForReviewHandler';
import { ApproveArticleHandler } from '@modules/article/application/handlers/ApproveArticleHandler';
import { ArticleController } from '@modules/article/interfaces/controllers/ArticleController';

import { CreateArticleCommandValidator, UpdateArticleCommandValidator, ArticleIdValidator } from '@modules/article/application/validators/ArticleValidators';
import { PostgresArticleRepository } from '@modules/article/infrastructure/postgres/PostgresArticleRepository';
import { ArticleOntologyValidator } from '@modules/article/application/services/ArticleOntologyValidator';
import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';
import { OntologyGraphService } from '@modules/ontology/application/services/OntologyGraphService';
import { GraphContextRetrievalService } from '@modules/graph/infrastructure/services/GraphContextRetrievalService';
import { IGraphContextRetrievalService } from '@modules/graph/application/services/IGraphContextRetrievalService';
import { GetNodeHandler } from '@modules/graph/public';
import { SearchGraphHandler } from '@modules/graph/public';
import { FindShortestPathHandler } from '@modules/graph/public';
import { GraphController } from '@modules/graph/public';
import { OntologyValidator } from '@modules/graph/public';
import { logger } from '@shared/logger/Logger';
import { AuthenticationService } from '@modules/auth/domain/services/AuthenticationService';
import { GetCurrentUserQueryHandler } from '@modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { SearchProvider, PostgresSearchProvider, SearchRepository, SearchController, AutocompleteController, SearchQueryHandler, AutocompleteQueryHandler } from '@modules/search/public';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { ChangeThemeHandler, GetSettingsHandler, CreateSettingsHandler } from '@modules/settings/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UpdateSettingsHandler, UpdateLanguageHandler, UpdatePrivacyHandler, UpdateNotificationSettingsHandler, UpdateSecuritySettingsHandler, ResetSettingsHandler } from '@modules/settings/public';
import { SettingsController } from '@modules/settings/interfaces/controllers/SettingsController';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';
import { RedisCacheProvider } from '@shared/infrastructure/cache/RedisCacheProvider';
import { PostgresSettingsRepository } from '@modules/settings/infrastructure/PostgresSettingsRepository';
import { TokenUsageService } from '@modules/ai/infrastructure/services/TokenUsageService';
import { NotificationService } from '@modules/notification/domain/services/NotificationService';
import { PromptSanitizationService } from '@modules/ai/infrastructure/security/PromptSanitizationService';
import { HybridSearchService } from '@modules/search/application/services/HybridSearchService';
import { ContextRetrievalService } from '@modules/ai/application/services/ContextRetrievalService';
import { ArticleLinkedToEntityHandler } from '@modules/entity/application/events/ArticleLinkedToEntityHandler';
import { ArticleLinkedToMediaHandler } from '@modules/media/application/events/ArticleLinkedToMediaHandler';
import { ArticleLinkedToRelationshipHandler } from '@modules/relationship/application/events/ArticleLinkedToRelationshipHandler';
import { ArticlePublishedIndexer } from '@modules/search/application/events/ArticlePublishedIndexer';
import { EntityCreatedHandler } from '@modules/graph/application/events/EntityCreatedHandler';
import { EntityUpdatedHandler } from '@modules/graph/application/events/EntityUpdatedHandler';
import { EntityDeletedHandler } from '@modules/graph/application/events/EntityDeletedHandler';
import { RelationshipCreatedHandler } from '@modules/graph/application/events/RelationshipCreatedHandler';
import { RelationshipDeletedHandler } from '@modules/graph/application/events/RelationshipDeletedHandler';
export const container = new Container();

// Relationship policies
container.bind(CardinalityPolicy).toSelf();
container.bind(CircularRelationshipPolicy).toSelf();
container.bind(DuplicateRelationshipPolicy).toSelf();
container.bind(TemporalValidityPolicy).toSelf();

container.bind(RelationshipValidationService).toDynamicValue((context) => {
    return new RelationshipValidationService([
        context.container.get(CardinalityPolicy),
        context.container.get(CircularRelationshipPolicy),
        context.container.get(DuplicateRelationshipPolicy),
        context.container.get(TemporalValidityPolicy),
    ]);
});

if (process.env.NODE_ENV === 'test') {
  container.bind('IAuditLogger').toConstantValue({ log: async () => {} });
} else {
  container.bind('IAuditLogger').to(AuditLogger);
}

// AI Context
container.bind(PostgresProviderRepository).toSelf();
container.bind(HybridSearchService).toSelf();
container.bind(ContextRetrievalService).toDynamicValue((context) => {
    return new ContextRetrievalService(context.container.get(HybridSearchService));
});
container.bind(ProviderRegistry).toDynamicValue((context) => {
    const registry = new ProviderRegistry();
    registry.register({ id: 'gemini-id', name: 'Gemini', isEnabled: true, priority: 10 } as any, new GeminiProvider());
    return registry;
});
container.bind(ProviderSelectionService).toDynamicValue((context) => {
    return new ProviderSelectionService(context.container.get(PostgresProviderRepository));
});
container.bind(AIGatewayService).toDynamicValue((context) => {
  return new AIGatewayService(
    context.container.get(ProviderSelectionService),
    context.container.get(ProviderRegistry),
    context.container.get('IPromptRepository'),
    context.container.get(PromptSanitizationService),
    context.container.get('ITokenUsageService')
  );
});
// Prompt repository (infrastructure)
container.bind('IPromptRepository')
  .toDynamicValue((context) => {
    const { PostgresPromptRepository } = require('@modules/ai/infrastructure/repositories/PostgresPromptRepository');
    return new PostgresPromptRepository(context.container.get(PostgresProvider));
  })
  .inSingletonScope();

// Prompt sanitization service
container.bind(PromptSanitizationService).toSelf().inSingletonScope();

// Token‑usage service
container.bind('ITokenUsageService')
  .toDynamicValue((context) => {
    return new TokenUsageService(
      context.container.get('IAuditLogger')
    );
  })
  .inSingletonScope();

container.bind(ExpansionRequestService).toDynamicValue((context) => {
  return new ExpansionRequestService(context.container.get(AIGatewayService));
});
container.bind(OntologySuggestionService).toDynamicValue((context) => {
    return new OntologySuggestionService(context.container.get<IOntologyGraphService>('IOntologyGraphService'));
});
container.bind(ProcessAiRequestHandler).toDynamicValue((context) => {
    return new ProcessAiRequestHandler(context.container.get(AIGatewayService));
});
container.bind(AiController).toDynamicValue((context) => {
    return new AiController(context.container.get(ProcessAiRequestHandler));
});
container.bind(AuthenticationService).toDynamicValue((context) => {
    return new AuthenticationService(
        context.container.get('IPasswordHasher'),
        context.container.get('IAuditLogger')
    );
});

// Database/Infrastructure
container.bind(PostgresProvider).toSelf().inSingletonScope();
container.bind<IUnitOfWork>(PostgresUnitOfWork).toSelf().inSingletonScope();
container.bind<IUnitOfWork>('IUnitOfWork').to(PostgresUnitOfWork).inSingletonScope();
container.bind<IOutboxRepository>('IOutboxRepository').toDynamicValue((context) => {
    return new PostgresOutboxRepository(context.container.get(Pool));
}).inSingletonScope();
container.bind(Pool).toDynamicValue((context) => context.container.get(PostgresProvider).pool);
container.bind<IAuditRepository>('IAuditRepository').toDynamicValue((context) => {
    return new PostgresAuditRepository(context.container.get(Pool));
}).inSingletonScope();
container.bind('IUserRepository').toDynamicValue((context) => {
    return new PostgresUserRepository(context.container.get(Pool));
});
container.bind('IUserProfileRepository').toDynamicValue((context) => {
    return new PostgresUserProfileRepository(context.container.get(Pool));
});
container.bind('ISessionRepository').toDynamicValue((context) => {
    const redisClient = new Redis({ host: env.REDIS_HOST, port: parseInt(env.REDIS_PORT, 10) });
    return new RedisSessionRepository(redisClient);
});
container.bind('IPasswordHasher').to(BcryptPasswordHasher);
container.bind('IJwtProvider').to(JwtProvider);
container.bind('ITotpProvider').to(TotpProvider);
container.bind(CacheProvider).to(RedisCacheProvider).inSingletonScope();
if (process.env.NODE_ENV === 'test') {
  container.bind('EventBus').toConstantValue({ publish: jest.fn() });
} else {
  container.bind('EventBus').to(BullMqEventBus);
}

container.bind(OutboxDispatcher).toDynamicValue((context) => {
  return new OutboxDispatcher(
      context.container.get('IOutboxRepository'),
      context.container.get('EventBus'),
      context.container.get<IUnitOfWork>('IUnitOfWork'),
      parseInt(env.OUTBOX_POLLING_INTERVAL || '5000', 10),
      parseInt(env.OUTBOX_BATCH_SIZE || '50', 10)
  );
}).inSingletonScope();
container.bind('ISearchRepository').toDynamicValue((context) => {
    return new SearchRepository(context.container.get(SearchProvider));
});
container.bind(ArticlePublishedIndexer).toSelf();
container.bind(SearchQueryHandler).toSelf();
container.bind(AutocompleteQueryHandler).toSelf();
container.bind(SearchController).toSelf();
container.bind(AutocompleteController).toSelf();

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
container.bind(LoginCommandHandler).toDynamicValue((context) => {
    return new LoginCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('IPasswordHasher'),
        context.container.get('IJwtProvider'),
        context.container.get('EventBus')
    );
});
container.bind(LogoutCommandHandler).toDynamicValue((context) => {
    return new LogoutCommandHandler(
        context.container.get('ISessionRepository'),
        context.container.get('EventBus')
    );
});
container.bind(RefreshCommandHandler).toSelf();
container.bind(ResetPasswordCommandHandler).toDynamicValue((context) => {
    return new ResetPasswordCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('IPasswordHasher'),
        context.container.get('EventBus')
    );
});
container.bind(VerifyEmailCommandHandler).toDynamicValue((context) => {
    return new VerifyEmailCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(UpdateProfileCommandHandler).toDynamicValue((context) => {
    return new UpdateProfileCommandHandler(
        context.container.get('IUserProfileRepository'),
        context.container.get('EventBus')
    );
});
container.bind(EnableMfaCommandHandler).toDynamicValue((context) => {
    return new EnableMfaCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('ITotpProvider'),
        context.container.get('EventBus')
    );
});

container.bind(BanUserCommandHandler).toDynamicValue((context) => {
    return new BanUserCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(SuspendUserCommandHandler).toDynamicValue((context) => {
    return new SuspendUserCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(RestoreAccountCommandHandler).toDynamicValue((context) => {
    return new RestoreAccountCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(AssignRoleCommandHandler).toDynamicValue((context) => {
    return new AssignRoleCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(RemoveRoleCommandHandler).toDynamicValue((context) => {
    return new RemoveRoleCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});

container.bind(DisableAccountCommandHandler).toDynamicValue((context) => {
    return new DisableAccountCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(ListUsersQueryHandler).toDynamicValue((context) => {
    return new ListUsersQueryHandler(
        context.container.get('IUserRepository')
    );
});
container.bind(SearchUsersQueryHandler).toDynamicValue((context) => {
    return new SearchUsersQueryHandler(
        context.container.get('IUserRepository')
    );
});
container.bind(ListUserSessionsQueryHandler).toDynamicValue((context) => {
    return new ListUserSessionsQueryHandler(
        context.container.get('ISessionRepository')
    );
});
container.bind(RevokeAllUserSessionsCommandHandler).toDynamicValue((context) => {
    return new RevokeAllUserSessionsCommandHandler(
        context.container.get('ISessionRepository'),
        context.container.get('EventBus')
    );
});
container.bind(UnlockUserCommandHandler).toDynamicValue((context) => {
    return new UnlockUserCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(EnableAccountCommandHandler).toDynamicValue((context) => {
    return new EnableAccountCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(RevokeSessionCommandHandler).toDynamicValue((context) => {
    return new RevokeSessionCommandHandler(
        context.container.get('ISessionRepository')
    );
});

container.bind(ActivateAccountCommandHandler).toDynamicValue((context) => {
    return new ActivateAccountCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(ChangePasswordCommandHandler).toDynamicValue((context) => {
    return new ChangePasswordCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('IPasswordHasher'),
        context.container.get('EventBus')
    );
});
container.bind(DeleteAccountCommandHandler).toDynamicValue((context) => {
    return new DeleteAccountCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(ChangeEmailCommandHandler).toDynamicValue((context) => {
    return new ChangeEmailCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});
container.bind(UnbanUserCommandHandler).toDynamicValue((context) => {
    return new UnbanUserCommandHandler(
        context.container.get('IUserRepository'),
        context.container.get('EventBus')
    );
});

container.bind(AuthController).toDynamicValue((context) => {
  return new AuthController(
    context.container.get(LoginCommandHandler),
    context.container.get(LogoutCommandHandler),
    context.container.get(RefreshCommandHandler),
    context.container.get(RegisterUserCommandHandler),
    context.container.get(ResetPasswordCommandHandler),
    context.container.get(VerifyEmailCommandHandler),
    context.container.get(UpdateProfileCommandHandler),
    context.container.get(BanUserCommandHandler),
    context.container.get(SuspendUserCommandHandler),
    context.container.get(RestoreAccountCommandHandler),
    context.container.get(AssignRoleCommandHandler),
    context.container.get(RemoveRoleCommandHandler),
    context.container.get(DisableAccountCommandHandler),
    context.container.get(ListUsersQueryHandler),
    context.container.get(SearchUsersQueryHandler),
    context.container.get(ActivateAccountCommandHandler),
    context.container.get(ChangePasswordCommandHandler),
    context.container.get(DeleteAccountCommandHandler),
    context.container.get(ChangeEmailCommandHandler),
    context.container.get(UnbanUserCommandHandler),
    context.container.get(EnableMfaCommandHandler),
    context.container.get(ListUserSessionsQueryHandler),
    context.container.get(RevokeAllUserSessionsCommandHandler),
    context.container.get(UnlockUserCommandHandler),
    context.container.get(EnableAccountCommandHandler),
    context.container.get(RevokeSessionCommandHandler)
  );
});

// Ontology
container.bind('IOntologyRepository').to(PostgresOntologyRepository);
container.bind('IEntityTypeRepository').toDynamicValue((context) => {
    return new PostgresEntityTypeRepository(context.container.get(PostgresProvider));
});
container.bind('IRelationshipTypeRepository').toDynamicValue((context) => {
    return new PostgresRelationshipTypeRepository(context.container.get(PostgresProvider));
});
container.bind('IOntologyVersionRepository').toDynamicValue((context) => {
    return new PostgresOntologyVersionRepository(context.container.get(PostgresProvider));
});
container.bind(UniqueOntologyPolicy).toSelf();
container.bind(OntologyService).toSelf();
container.bind(EntityTypeService).toDynamicValue((context) => {
  return new EntityTypeService(
      context.container.get('IEntityTypeRepository'),
      context.container.get('IOntologyRepository'),
      context.container.get(EntityTypeValidator),
      context.container.get(EventBus)
  );
});
container.bind(EntityTypeValidator).toSelf();
container.bind(CreateOntologyCommandHandler).toSelf();
container.bind(OntologyController).toSelf();
container.bind('IMetricsProvider').to(PrometheusMetricsProvider).inSingletonScope();
container.bind<IOntologyGraphService>('IOntologyGraphService').toDynamicValue((context) => {
    return new OntologyGraphService(
        context.container.get('IEntityTypeRepository'),
        context.container.get('IRelationshipTypeRepository')
    );
});

// Entity
container.bind('IEntityRepository').to(PostgresEntityRepository);
container.bind(ArticleLinkedToEntityHandler).toSelf();
container.bind(AddAliasCommandHandler).toSelf();
container.bind(ArchiveEntityCommandHandler).toSelf();
container.bind(CreateEntityCommandHandler).toSelf();
container.bind(CreateEntityVersionCommandHandler).toSelf();
container.bind(DeleteEntityCommandHandler).toSelf();
container.bind(GetEntityByIdentifierQueryHandler).toSelf();
container.bind(GetEntityBySlugQueryHandler).toSelf();
container.bind(GetEntityQueryHandler).toSelf();
container.bind(GetEntityVersionQueryHandler).toSelf();
container.bind(ListAliasesQueryHandler).toSelf();
container.bind(ListEntitiesQueryHandler).toSelf();
container.bind(MergeEntitiesCommandHandler).toSelf();
container.bind(PublishEntityCommandHandler).toSelf();
container.bind(RemoveAliasCommandHandler).toSelf();
container.bind(RestoreEntityCommandHandler).toSelf();
container.bind(SearchEntitiesQueryHandler).toSelf();
container.bind(UpdateEntityCommandHandler).toSelf();
container.bind(EntityController).toDynamicValue((context) => {
    return new EntityController(
        context.container.get(CreateEntityCommandHandler),
        context.container.get(UpdateEntityCommandHandler),
        context.container.get(DeleteEntityCommandHandler),
        context.container.get(PublishEntityCommandHandler),
        context.container.get(ArchiveEntityCommandHandler),
        context.container.get(RestoreEntityCommandHandler),
        context.container.get(MergeEntitiesCommandHandler),
        context.container.get(AddAliasCommandHandler),
        context.container.get(RemoveAliasCommandHandler),
        context.container.get(CreateEntityVersionCommandHandler),
        context.container.get(GetEntityQueryHandler),
        context.container.get(GetEntityByIdentifierQueryHandler),
        context.container.get(GetEntityBySlugQueryHandler),
        context.container.get(ListEntitiesQueryHandler),
        context.container.get(SearchEntitiesQueryHandler),
        context.container.get(ListAliasesQueryHandler),
        context.container.get(GetEntityVersionQueryHandler)
    );
});

// Settings
container.bind('ISettingsRepository').toDynamicValue((context) => {
    return new PostgresSettingsRepository(context.container.get(PostgresProvider), context.container.get(CacheProvider));
});
container.bind(CreateSettingsHandler).toDynamicValue((context) => {
    return new CreateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get('EventBus'));
});
container.bind(ChangeThemeHandler).toDynamicValue((context) => {
    return new ChangeThemeHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get('EventBus'));
});
container.bind(GetSettingsHandler).toDynamicValue((context) => {
    return new GetSettingsHandler(context.container.get('ISettingsRepository'));
});
container.bind(UpdateSettingsHandler).toDynamicValue((context) => {
    return new UpdateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(UpdateLanguageHandler).toDynamicValue((context) => {
    return new UpdateLanguageHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(UpdatePrivacyHandler).toDynamicValue((context) => {
    return new UpdatePrivacyHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(UpdateNotificationSettingsHandler).toDynamicValue((context) => {
    return new UpdateNotificationSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(UpdateSecuritySettingsHandler).toDynamicValue((context) => {
    return new UpdateSecuritySettingsHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(ResetSettingsHandler).toDynamicValue((context) => {
    return new ResetSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('EventBus'));
});
container.bind(SettingsController).toDynamicValue((context) => {
  return new SettingsController(
    context.container.get(ChangeThemeHandler),
    context.container.get(GetSettingsHandler),
    context.container.get(UpdateSettingsHandler),
    context.container.get(UpdateLanguageHandler),
    context.container.get(UpdatePrivacyHandler),
    context.container.get(UpdateNotificationSettingsHandler),
    context.container.get(UpdateSecuritySettingsHandler),
    context.container.get(ResetSettingsHandler)
  );
});

// Media
container.bind(ArticleLinkedToMediaHandler).toSelf();
container.bind('INotificationRepository').toDynamicValue((context) => {
    return new PostgresNotificationRepository(context.container.get(PostgresProvider));
});
container.bind(PreferenceService).toDynamicValue((context) => {
    return new PreferenceService(context.container.get('INotificationRepository'));
});
container.bind(DeliveryService).toSelf();
container.bind(NotificationService).toDynamicValue((context) => {
    return new NotificationService(
        context.container.get('INotificationRepository'),
        context.container.get(PreferenceService),
        context.container.get('EventBus')
    );
});
container.bind('IRelationshipRepository').toDynamicValue((context) => {
    return new PostgresRelationshipRepository(context.container.get(PostgresProvider));
});
container.bind(ArticleLinkedToRelationshipHandler).toSelf();
container.bind('IOntologyService').toDynamicValue((context) => {
    return new OntologyIntegrationService(
        context.container.get<IOntologyGraphService>('IOntologyGraphService')
    );
});
container.bind(CreateRelationshipHandler).toDynamicValue((context) => {
    return new CreateRelationshipHandler(
        context.container.get('IRelationshipRepository'),
        context.container.get<IOntologyService>('IOntologyService'),
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

// Article
container.bind('IArticleRepository').toDynamicValue((context) => {
    return new PostgresArticleRepository(context.container.get(Pool));
});
container.bind(CreateArticleCommandValidator).toSelf();
container.bind(UpdateArticleCommandValidator).toSelf();
container.bind(ArticleIdValidator).toSelf();
container.bind(ArticleOntologyValidator).toDynamicValue((context) => {
    return new ArticleOntologyValidator(
        context.container.get('IOntologyGraphService')
    );
});

container.bind(CreateArticleHandler).toDynamicValue((context) => {
    return new CreateArticleHandler(
        context.container.get('IArticleRepository'),
        context.container.get('IAuditLogger')
    );
});
container.bind(UpdateArticleHandler).toDynamicValue((context) => {
    return new UpdateArticleHandler(context.container.get('IArticleRepository'));
});
container.bind(DeleteArticleHandler).toDynamicValue((context) => {
    return new DeleteArticleHandler(
        context.container.get('IArticleRepository'),
        context.container.get('EventBus')
    );
});
container.bind(PublishArticleHandler).toDynamicValue((context) => {
    return new PublishArticleHandler(
        context.container.get('IArticleRepository'),
        context.container.get('IAuditLogger')
    );
});
container.bind(ArchiveArticleHandler).toDynamicValue((context) => {
    return new ArchiveArticleHandler(context.container.get('IArticleRepository'));
});
container.bind(SubmitForReviewHandler).toDynamicValue((context) => {
    return new SubmitForReviewHandler(context.container.get('IArticleRepository'));
});
container.bind(ApproveArticleHandler).toDynamicValue((context) => {
    return new ApproveArticleHandler(
        context.container.get('IArticleRepository'),
        context.container.get('EventBus')
    );
});
container.bind(AddBookmarkCommandHandler).toDynamicValue((context) => {
    return new AddBookmarkCommandHandler(
        context.container.get('IUserBookmarkRepository'),
        context.container.get('EventBus')
    );
});
container.bind(AddToReadingHistoryCommandHandler).toDynamicValue((context) => {
    return new AddToReadingHistoryCommandHandler(
        context.container.get('IReadingHistoryRepository'),
        context.container.get('EventBus')
    );
});
container.bind(UpdateReadingProgressCommandHandler).toDynamicValue((context) => {
    return new UpdateReadingProgressCommandHandler(
        context.container.get('IContinueReadingRepository'),
        context.container.get('EventBus')
    );
});
container.bind(GetBookmarksQueryHandler).toDynamicValue((context) => {
    return new GetBookmarksQueryHandler(
        context.container.get('IUserBookmarkRepository'),
        context.container.get('EventBus')
    );
});
container.bind(GetReadingHistoryQueryHandler).toDynamicValue((context) => {
    return new GetReadingHistoryQueryHandler(
        context.container.get('IReadingHistoryRepository'),
        context.container.get('EventBus')
    );
});
container.bind(ArticleController).toDynamicValue((context) => {
    return new ArticleController(
        context.container.get(CreateArticleHandler),
        context.container.get(UpdateArticleHandler),
        context.container.get(DeleteArticleHandler),
        context.container.get(PublishArticleHandler),
        context.container.get(ArchiveArticleHandler),
        context.container.get(SubmitForReviewHandler),
        context.container.get(ApproveArticleHandler),
        context.container.get(AddBookmarkCommandHandler),
        context.container.get(AddToReadingHistoryCommandHandler),
        context.container.get(UpdateReadingProgressCommandHandler),
        context.container.get(GetBookmarksQueryHandler),
        context.container.get(GetReadingHistoryQueryHandler),
        context.container.get('IMetricsProvider')
    );
});

// Graph
container.bind('IGraphRepository').toDynamicValue((context) => {
    return new PostgresGraphRepository(context.container.get(Pool));
});
container.bind(EntityCreatedHandler).toDynamicValue((context) => new EntityCreatedHandler(context.container.get('IGraphRepository')));
container.bind(EntityUpdatedHandler).toDynamicValue((context) => new EntityUpdatedHandler(context.container.get('IGraphRepository')));
container.bind(EntityDeletedHandler).toDynamicValue((context) => new EntityDeletedHandler(context.container.get('IGraphRepository')));
container.bind(RelationshipCreatedHandler).toDynamicValue((context) => new RelationshipCreatedHandler(context.container.get('IGraphRepository'), context.container.get(OntologyValidator)));
container.bind(RelationshipDeletedHandler).toDynamicValue((context) => new RelationshipDeletedHandler(context.container.get('IGraphRepository'), context.container.get(RelationshipService)));
container.bind<IGraphContextRetrievalService>('IGraphContextRetrievalService').toDynamicValue((context) => {
    return new GraphContextRetrievalService(context.container.get('IGraphRepository'));
});
container.bind(OntologyValidator).toDynamicValue((context) => {
    return new OntologyValidator(context.container.get('IOntologyGraphService'));
});
container.bind(CreateGraphNodeHandler).toDynamicValue((context) => {
    return new CreateGraphNodeHandler(
        context.container.get('IGraphRepository'),
        context.container.get(OntologyValidator),
        context.container.get('EventBus'),
        logger
    );
});
container.bind(UpdateGraphNodeHandler).toDynamicValue((context) => {
    return new UpdateGraphNodeHandler(
        context.container.get('IGraphRepository'),
        context.container.get('EventBus')
    );
});
container.bind(DeleteGraphNodeHandler).toDynamicValue((context) => {
    return new DeleteGraphNodeHandler(
        context.container.get('IGraphRepository'),
        context.container.get('EventBus')
    );
});
container.bind(CreateGraphEdgeHandler).toDynamicValue((context) => {
    return new CreateGraphEdgeHandler(
        context.container.get('IGraphRepository'),
        context.container.get(OntologyValidator),
        context.container.get('EventBus')
    );
});
container.bind(UpdateGraphEdgeHandler).toDynamicValue((context) => {
    return new UpdateGraphEdgeHandler(
        context.container.get('IGraphRepository'),
        context.container.get('EventBus')
    );
});
container.bind(DeleteGraphEdgeHandler).toDynamicValue((context) => {
    return new DeleteGraphEdgeHandler(
        context.container.get('IGraphRepository'),
        context.container.get('EventBus')
    );
});
container.bind(GetNodeHandler).toDynamicValue((context) => {
    return new GetNodeHandler(context.container.get('IGraphRepository'));
});
container.bind(SearchGraphHandler).toDynamicValue((context) => {
    return new SearchGraphHandler(context.container.get('IGraphRepository'));
});
container.bind(FindShortestPathHandler).toDynamicValue((context) => {
    return new FindShortestPathHandler(context.container.get('IGraphRepository'));
});
container.bind(GraphController).toDynamicValue((context) => {
    return new GraphController(
        context.container.get(CreateGraphNodeHandler),
        context.container.get(CreateGraphEdgeHandler),
        context.container.get(GetNodeHandler),
        context.container.get(SearchGraphHandler),
        context.container.get(FindShortestPathHandler)
    );
});
