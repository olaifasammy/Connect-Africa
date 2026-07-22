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
import { EntityController } from '@modules/entity/interfaces/EntityController';
import { PostgresRelationshipRepository } from '@modules/relationship/infrastructure/repositories/PostgresRelationshipRepository';
import { CreateRelationshipHandler } from '@modules/relationship/application/handlers/CreateRelationshipHandler';
import { EnableMfaCommandHandler } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';
import { PostgresNotificationRepository, PreferenceService, DeliveryService } from '@modules/notification/public';
import { RelationshipController } from '@modules/relationship/interfaces/controllers/RelationshipController';
import { OntologyIntegrationService } from '@modules/relationship/infrastructure/services/OntologyIntegrationService';
import { RelationshipService } from '@modules/relationship/application/services/RelationshipService';
import { IOntologyService } from '@modules/relationship/domain/interfaces/RelationshipServices';
import { RelationshipValidationService } from '@modules/relationship/domain/services/RelationshipValidationService';
import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { OntologyService } from '@modules/ontology/application/services/OntologyService';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { PostgresOntologyRepository } from '@modules/ontology/infrastructure/PostgresOntologyRepository';
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
import { BullMqEventBus } from '@shared/infrastructure/queue/BullMqEventBus';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { VerifyEmailCommandHandler } from '@modules/auth/application/handlers/VerifyEmailCommandHandler';
import { UpdateProfileCommandHandler } from '@modules/auth/application/handlers/UpdateProfileCommandHandler';
import { BanUserCommandHandler } from '@modules/auth/application/handlers/BanUserCommandHandler';
import { RedisSessionRepository } from '@modules/auth/infrastructure/RedisSessionRepository';
import { Pool } from 'pg';
import { PostgresGraphRepository } from '@modules/graph/public';
import { CreateGraphNodeHandler } from '@modules/graph/public';
import { CreateGraphEdgeHandler, UpdateGraphNodeHandler, DeleteGraphNodeHandler, UpdateGraphEdgeHandler, DeleteGraphEdgeHandler } from '@modules/graph/public';
import { CreateArticleHandler } from '@modules/article/application/handlers/CreateArticleHandler';
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
import { NotificationService } from '@modules/notification/domain/services/NotificationService';

export const container = new Container();

if (process.env.NODE_ENV === 'test') {
  container.bind('IAuditLogger').toConstantValue({ log: async () => {} });
} else {
  container.bind('IAuditLogger').to(AuditLogger);
}

// AI Context
container.bind(PostgresProviderRepository).toSelf();
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
        context.container.get(ProviderRegistry)
    );
});
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
container.bind(CacheProvider).to(RedisCacheProvider).inSingletonScope();
if (process.env.NODE_ENV === 'test') {
  container.bind('EventBus').toConstantValue({ publish: jest.fn() });
} else {
  container.bind('EventBus').to(BullMqEventBus);
}

// Search
container.bind(SearchProvider).to(PostgresSearchProvider);
container.bind('ISearchRepository').toDynamicValue((context) => {
    return new SearchRepository(context.container.get(SearchProvider));
});
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
container.bind(AuthController).toDynamicValue((context) => {
  return new AuthController(
    context.container.get(LoginCommandHandler),
    context.container.get(LogoutCommandHandler),
    context.container.get(RefreshCommandHandler),
    context.container.get(RegisterUserCommandHandler),
    context.container.get(ResetPasswordCommandHandler),
    context.container.get(VerifyEmailCommandHandler),
    context.container.get(UpdateProfileCommandHandler),
    context.container.get(BanUserCommandHandler)
  );
});

// Ontology
container.bind('IOntologyRepository').to(PostgresOntologyRepository);
container.bind(UniqueOntologyPolicy).toSelf();
container.bind(OntologyService).toSelf();
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
container.bind(CreateEntityCommandHandler).toDynamicValue((context) => {
    return new CreateEntityCommandHandler(
        context.container.get('IEntityRepository'),
        context.container.get<IOntologyGraphService>('IOntologyGraphService'),
        context.container.get<IAuditRepository>('IAuditRepository'),
        context.container.get('EventBus')
    );
});
container.bind(EntityController).toSelf();

// Settings
container.bind('ISettingsRepository').toDynamicValue((context) => {
    return new PostgresSettingsRepository(context.container.get(PostgresProvider), context.container.get(CacheProvider));
});
container.bind(CreateSettingsHandler).toDynamicValue((context) => {
    return new CreateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(ChangeThemeHandler).toDynamicValue((context) => {
    return new ChangeThemeHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(GetSettingsHandler).toDynamicValue((context) => {
    return new GetSettingsHandler(context.container.get('ISettingsRepository'));
});
container.bind(UpdateSettingsHandler).toDynamicValue((context) => {
    return new UpdateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(UpdateLanguageHandler).toDynamicValue((context) => {
    return new UpdateLanguageHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(UpdatePrivacyHandler).toDynamicValue((context) => {
    return new UpdatePrivacyHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(UpdateNotificationSettingsHandler).toDynamicValue((context) => {
    return new UpdateNotificationSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(UpdateSecuritySettingsHandler).toDynamicValue((context) => {
    return new UpdateSecuritySettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
});
container.bind(ResetSettingsHandler).toDynamicValue((context) => {
    return new ResetSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus));
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

// Notification
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
        context.container.get('EventBus'),
        context.container.get('IAuditLogger')
    );
});
container.bind('IRelationshipRepository').toDynamicValue((context) => {
    return new PostgresRelationshipRepository(context.container.get(PostgresProvider));
});
container.bind('IOntologyService').toDynamicValue((context) => {
    return new OntologyIntegrationService(
        context.container.get<IOntologyGraphService>('IOntologyGraphService')
    );
});
container.bind(CreateRelationshipHandler).toDynamicValue((context) => {
    return new CreateRelationshipHandler(
        context.container.get('IRelationshipRepository'),
        context.container.get<IOntologyService>('IOntologyService'),
        context.container.get('IAuditRepository'),
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
container.bind(ArticleOntologyValidator).toDynamicValue((context) => {
    return new ArticleOntologyValidator(
        context.container.get<IOntologyGraphService>('IOntologyGraphService')
    );
});
container.bind(CreateArticleHandler).toDynamicValue((context) => {
    return new CreateArticleHandler(
        context.container.get('IArticleRepository'),
        context.container.get('IAuditLogger')
    );
});

// Graph
container.bind('IGraphRepository').toDynamicValue((context) => {
    return new PostgresGraphRepository(context.container.get(Pool));
});
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
