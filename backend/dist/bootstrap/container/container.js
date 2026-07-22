"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("../../config/env");
const GeminiProvider_1 = require("../../modules/ai/infrastructure/providers/GeminiProvider");
const ProviderRegistry_1 = require("../../modules/ai/infrastructure/providers/ProviderRegistry");
const ProviderSelectionService_1 = require("../../modules/ai/domain/services/ProviderSelectionService");
const AIGatewayService_1 = require("../../modules/ai/application/services/AIGatewayService");
const PostgresProviderRepository_1 = require("../../modules/ai/infrastructure/repositories/PostgresProviderRepository");
const ExpansionRequestService_1 = require("../../modules/ai/application/services/ExpansionRequestService");
const OntologySuggestionService_1 = require("../../modules/ai/application/services/OntologySuggestionService");
const ProcessAiRequestHandler_1 = require("../../modules/ai/application/handlers/ProcessAiRequestHandler");
const AiController_1 = require("../../modules/ai/interfaces/controllers/AiController");
const PostgresEntityRepository_1 = require("../../modules/entity/infrastructure/PostgresEntityRepository");
const CreateEntityCommandHandler_1 = require("../../modules/entity/application/handlers/CreateEntityCommandHandler");
const EntityController_1 = require("../../modules/entity/interfaces/EntityController");
const PostgresRelationshipRepository_1 = require("../../modules/relationship/infrastructure/repositories/PostgresRelationshipRepository");
const CreateRelationshipHandler_1 = require("../../modules/relationship/application/handlers/CreateRelationshipHandler");
const EnableMfaCommandHandler_1 = require("../../modules/auth/application/handlers/mfa/EnableMfaCommandHandler");
const public_1 = require("../../modules/notification/public");
const RelationshipController_1 = require("../../modules/relationship/interfaces/controllers/RelationshipController");
const OntologyIntegrationService_1 = require("../../modules/relationship/infrastructure/services/OntologyIntegrationService");
const RelationshipService_1 = require("../../modules/relationship/application/services/RelationshipService");
const RelationshipValidationService_1 = require("../../modules/relationship/domain/services/RelationshipValidationService");
const CreateOntologyCommandHandler_1 = require("../../modules/ontology/application/handlers/CreateOntologyCommandHandler");
const OntologyService_1 = require("../../modules/ontology/application/services/OntologyService");
const OntologyController_1 = require("../../modules/ontology/interfaces/controllers/OntologyController");
const UniqueOntologyPolicy_1 = require("../../modules/ontology/domain/policies/UniqueOntologyPolicy");
const PostgresOntologyRepository_1 = require("../../modules/ontology/infrastructure/PostgresOntologyRepository");
const PrometheusMetricsProvider_1 = require("../../shared/infrastructure/monitoring/PrometheusMetricsProvider");
const PostgresUserRepository_1 = require("../../modules/auth/infrastructure/PostgresUserRepository");
const PostgresUserProfileRepository_1 = require("../../modules/auth/infrastructure/PostgresUserProfileRepository");
const AuditLogger_1 = require("../../modules/auth/infrastructure/AuditLogger");
const PostgresProvider_1 = require("../../shared/infrastructure/database/PostgresProvider");
const LoginCommandHandler_1 = require("../../modules/auth/application/handlers/LoginCommandHandler");
const RegisterUserCommandHandler_1 = require("../../modules/auth/application/handlers/RegisterUserCommandHandler");
const BcryptPasswordHasher_1 = require("../../shared/infrastructure/security/BcryptPasswordHasher");
const JwtProvider_1 = require("../../shared/infrastructure/security/JwtProvider");
const BullMqEventBus_1 = require("../../shared/infrastructure/queue/BullMqEventBus");
const AuthController_1 = require("../../modules/auth/interfaces/AuthController");
const LogoutCommandHandler_1 = require("../../modules/auth/application/handlers/LogoutCommandHandler");
const RefreshCommandHandler_1 = require("../../modules/auth/application/handlers/RefreshCommandHandler");
const ResetPasswordCommandHandler_1 = require("../../modules/auth/application/handlers/ResetPasswordCommandHandler");
const VerifyEmailCommandHandler_1 = require("../../modules/auth/application/handlers/VerifyEmailCommandHandler");
const UpdateProfileCommandHandler_1 = require("../../modules/auth/application/handlers/UpdateProfileCommandHandler");
const BanUserCommandHandler_1 = require("../../modules/auth/application/handlers/BanUserCommandHandler");
const RedisSessionRepository_1 = require("../../modules/auth/infrastructure/RedisSessionRepository");
const pg_1 = require("pg");
const public_2 = require("../../modules/graph/public");
const public_3 = require("../../modules/graph/public");
const public_4 = require("../../modules/graph/public");
const CreateArticleHandler_1 = require("../../modules/article/application/handlers/CreateArticleHandler");
const PostgresArticleRepository_1 = require("../../modules/article/infrastructure/postgres/PostgresArticleRepository");
const ArticleOntologyValidator_1 = require("../../modules/article/application/services/ArticleOntologyValidator");
const OntologyGraphService_1 = require("../../modules/ontology/application/services/OntologyGraphService");
const GraphContextRetrievalService_1 = require("../../modules/graph/infrastructure/services/GraphContextRetrievalService");
const public_5 = require("../../modules/graph/public");
const public_6 = require("../../modules/graph/public");
const public_7 = require("../../modules/graph/public");
const public_8 = require("../../modules/graph/public");
const public_9 = require("../../modules/graph/public");
const Logger_1 = require("../../shared/logger/Logger");
const AuthenticationService_1 = require("../../modules/auth/domain/services/AuthenticationService");
const GetCurrentUserQueryHandler_1 = require("../../modules/auth/application/handlers/queries/GetCurrentUserQueryHandler");
const AuthenticationMiddleware_1 = require("../../shared/interfaces/http/middleware/AuthenticationMiddleware");
const public_10 = require("../../modules/search/public");
const PostgresAuditRepository_1 = require("../../modules/audit/infrastructure/audit/PostgresAuditRepository");
const public_11 = require("../../modules/settings/public");
const EventBus_1 = require("../../shared/infrastructure/queue/EventBus");
const public_12 = require("../../modules/settings/public");
const SettingsController_1 = require("../../modules/settings/interfaces/controllers/SettingsController");
const CacheProvider_1 = require("../../shared/infrastructure/cache/CacheProvider");
const RedisCacheProvider_1 = require("../../shared/infrastructure/cache/RedisCacheProvider");
const PostgresSettingsRepository_1 = require("../../modules/settings/infrastructure/PostgresSettingsRepository");
const NotificationService_1 = require("../../modules/notification/domain/services/NotificationService");
exports.container = new inversify_1.Container();
if (process.env.NODE_ENV === 'test') {
    exports.container.bind('IAuditLogger').toConstantValue({ log: async () => { } });
}
else {
    exports.container.bind('IAuditLogger').to(AuditLogger_1.AuditLogger);
}
// AI Context
exports.container.bind(PostgresProviderRepository_1.PostgresProviderRepository).toSelf();
exports.container.bind(ProviderRegistry_1.ProviderRegistry).toDynamicValue((context) => {
    const registry = new ProviderRegistry_1.ProviderRegistry();
    registry.register({ id: 'gemini-id', name: 'Gemini', isEnabled: true, priority: 10 }, new GeminiProvider_1.GeminiProvider());
    return registry;
});
exports.container.bind(ProviderSelectionService_1.ProviderSelectionService).toDynamicValue((context) => {
    return new ProviderSelectionService_1.ProviderSelectionService(context.container.get(PostgresProviderRepository_1.PostgresProviderRepository));
});
exports.container.bind(AIGatewayService_1.AIGatewayService).toDynamicValue((context) => {
    return new AIGatewayService_1.AIGatewayService(context.container.get(ProviderSelectionService_1.ProviderSelectionService), context.container.get(ProviderRegistry_1.ProviderRegistry));
});
exports.container.bind(ExpansionRequestService_1.ExpansionRequestService).toDynamicValue((context) => {
    return new ExpansionRequestService_1.ExpansionRequestService(context.container.get(AIGatewayService_1.AIGatewayService));
});
exports.container.bind(OntologySuggestionService_1.OntologySuggestionService).toDynamicValue((context) => {
    return new OntologySuggestionService_1.OntologySuggestionService(context.container.get('IOntologyGraphService'));
});
exports.container.bind(ProcessAiRequestHandler_1.ProcessAiRequestHandler).toDynamicValue((context) => {
    return new ProcessAiRequestHandler_1.ProcessAiRequestHandler(context.container.get(AIGatewayService_1.AIGatewayService));
});
exports.container.bind(AiController_1.AiController).toDynamicValue((context) => {
    return new AiController_1.AiController(context.container.get(ProcessAiRequestHandler_1.ProcessAiRequestHandler));
});
exports.container.bind(AuthenticationService_1.AuthenticationService).toDynamicValue((context) => {
    return new AuthenticationService_1.AuthenticationService(context.container.get('IPasswordHasher'), context.container.get('IAuditLogger'));
});
// Database/Infrastructure
exports.container.bind(PostgresProvider_1.PostgresProvider).toSelf().inSingletonScope();
exports.container.bind(pg_1.Pool).toDynamicValue((context) => context.container.get(PostgresProvider_1.PostgresProvider).pool);
exports.container.bind('IAuditRepository').toDynamicValue((context) => {
    return new PostgresAuditRepository_1.PostgresAuditRepository(context.container.get(pg_1.Pool));
}).inSingletonScope();
exports.container.bind('IUserRepository').toDynamicValue((context) => {
    return new PostgresUserRepository_1.PostgresUserRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('IUserProfileRepository').toDynamicValue((context) => {
    return new PostgresUserProfileRepository_1.PostgresUserProfileRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('ISessionRepository').toDynamicValue((context) => {
    const redisClient = new ioredis_1.default({ host: env_1.env.REDIS_HOST, port: parseInt(env_1.env.REDIS_PORT, 10) });
    return new RedisSessionRepository_1.RedisSessionRepository(redisClient);
});
exports.container.bind('IPasswordHasher').to(BcryptPasswordHasher_1.BcryptPasswordHasher);
exports.container.bind('IJwtProvider').to(JwtProvider_1.JwtProvider);
exports.container.bind(CacheProvider_1.CacheProvider).to(RedisCacheProvider_1.RedisCacheProvider).inSingletonScope();
if (process.env.NODE_ENV === 'test') {
    exports.container.bind('EventBus').toConstantValue({ publish: jest.fn() });
}
else {
    exports.container.bind('EventBus').to(BullMqEventBus_1.BullMqEventBus);
}
// Search
exports.container.bind(public_10.SearchProvider).to(public_10.PostgresSearchProvider);
exports.container.bind('ISearchRepository').toDynamicValue((context) => {
    return new public_10.SearchRepository(context.container.get(public_10.SearchProvider));
});
exports.container.bind(public_10.SearchQueryHandler).toSelf();
exports.container.bind(public_10.AutocompleteQueryHandler).toSelf();
exports.container.bind(public_10.SearchController).toSelf();
exports.container.bind(public_10.AutocompleteController).toSelf();
exports.container.bind(GetCurrentUserQueryHandler_1.GetCurrentUserQueryHandler).toDynamicValue((context) => {
    return new GetCurrentUserQueryHandler_1.GetCurrentUserQueryHandler(context.container.get('IUserRepository'));
});
exports.container.bind(AuthenticationMiddleware_1.AuthenticationMiddleware).toDynamicValue((context) => {
    return new AuthenticationMiddleware_1.AuthenticationMiddleware(context.container.get('IJwtProvider'), context.container.get(GetCurrentUserQueryHandler_1.GetCurrentUserQueryHandler));
});
exports.container.bind(RegisterUserCommandHandler_1.RegisterUserCommandHandler).toDynamicValue((context) => {
    return new RegisterUserCommandHandler_1.RegisterUserCommandHandler(context.container.get('IUserRepository'), context.container.get('IPasswordHasher'), context.container.get('EventBus'));
});
exports.container.bind(LoginCommandHandler_1.LoginCommandHandler).toDynamicValue((context) => {
    return new LoginCommandHandler_1.LoginCommandHandler(context.container.get('IUserRepository'), context.container.get('IPasswordHasher'), context.container.get('IJwtProvider'), context.container.get('EventBus'));
});
exports.container.bind(LogoutCommandHandler_1.LogoutCommandHandler).toDynamicValue((context) => {
    return new LogoutCommandHandler_1.LogoutCommandHandler(context.container.get('ISessionRepository'), context.container.get('EventBus'));
});
exports.container.bind(RefreshCommandHandler_1.RefreshCommandHandler).toSelf();
exports.container.bind(ResetPasswordCommandHandler_1.ResetPasswordCommandHandler).toDynamicValue((context) => {
    return new ResetPasswordCommandHandler_1.ResetPasswordCommandHandler(context.container.get('IUserRepository'), context.container.get('IPasswordHasher'), context.container.get('EventBus'));
});
exports.container.bind(VerifyEmailCommandHandler_1.VerifyEmailCommandHandler).toDynamicValue((context) => {
    return new VerifyEmailCommandHandler_1.VerifyEmailCommandHandler(context.container.get('IUserRepository'), context.container.get('EventBus'));
});
exports.container.bind(UpdateProfileCommandHandler_1.UpdateProfileCommandHandler).toDynamicValue((context) => {
    return new UpdateProfileCommandHandler_1.UpdateProfileCommandHandler(context.container.get('IUserProfileRepository'), context.container.get('EventBus'));
});
exports.container.bind(EnableMfaCommandHandler_1.EnableMfaCommandHandler).toDynamicValue((context) => {
    return new EnableMfaCommandHandler_1.EnableMfaCommandHandler(context.container.get('IUserRepository'), context.container.get('ITotpProvider'), context.container.get('EventBus'));
});
exports.container.bind(AuthController_1.AuthController).toDynamicValue((context) => {
    return new AuthController_1.AuthController(context.container.get(LoginCommandHandler_1.LoginCommandHandler), context.container.get(LogoutCommandHandler_1.LogoutCommandHandler), context.container.get(RefreshCommandHandler_1.RefreshCommandHandler), context.container.get(RegisterUserCommandHandler_1.RegisterUserCommandHandler), context.container.get(ResetPasswordCommandHandler_1.ResetPasswordCommandHandler), context.container.get(VerifyEmailCommandHandler_1.VerifyEmailCommandHandler), context.container.get(UpdateProfileCommandHandler_1.UpdateProfileCommandHandler), context.container.get(BanUserCommandHandler_1.BanUserCommandHandler));
});
// Ontology
exports.container.bind('IOntologyRepository').to(PostgresOntologyRepository_1.PostgresOntologyRepository);
exports.container.bind(UniqueOntologyPolicy_1.UniqueOntologyPolicy).toSelf();
exports.container.bind(OntologyService_1.OntologyService).toSelf();
exports.container.bind(CreateOntologyCommandHandler_1.CreateOntologyCommandHandler).toSelf();
exports.container.bind(OntologyController_1.OntologyController).toSelf();
exports.container.bind('IMetricsProvider').to(PrometheusMetricsProvider_1.PrometheusMetricsProvider).inSingletonScope();
exports.container.bind('IOntologyGraphService').toDynamicValue((context) => {
    return new OntologyGraphService_1.OntologyGraphService(context.container.get('IEntityTypeRepository'), context.container.get('IRelationshipTypeRepository'));
});
// Entity
exports.container.bind('IEntityRepository').to(PostgresEntityRepository_1.PostgresEntityRepository);
exports.container.bind(CreateEntityCommandHandler_1.CreateEntityCommandHandler).toDynamicValue((context) => {
    return new CreateEntityCommandHandler_1.CreateEntityCommandHandler(context.container.get('IEntityRepository'), context.container.get('IOntologyGraphService'), context.container.get('IAuditRepository'), context.container.get('EventBus'));
});
exports.container.bind(EntityController_1.EntityController).toSelf();
// Settings
exports.container.bind('ISettingsRepository').toDynamicValue((context) => {
    return new PostgresSettingsRepository_1.PostgresSettingsRepository(context.container.get(PostgresProvider_1.PostgresProvider), context.container.get(CacheProvider_1.CacheProvider));
});
exports.container.bind(public_11.CreateSettingsHandler).toDynamicValue((context) => {
    return new public_11.CreateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_11.ChangeThemeHandler).toDynamicValue((context) => {
    return new public_11.ChangeThemeHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_11.GetSettingsHandler).toDynamicValue((context) => {
    return new public_11.GetSettingsHandler(context.container.get('ISettingsRepository'));
});
exports.container.bind(public_12.UpdateSettingsHandler).toDynamicValue((context) => {
    return new public_12.UpdateSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_12.UpdateLanguageHandler).toDynamicValue((context) => {
    return new public_12.UpdateLanguageHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_12.UpdatePrivacyHandler).toDynamicValue((context) => {
    return new public_12.UpdatePrivacyHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_12.UpdateNotificationSettingsHandler).toDynamicValue((context) => {
    return new public_12.UpdateNotificationSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_12.UpdateSecuritySettingsHandler).toDynamicValue((context) => {
    return new public_12.UpdateSecuritySettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(public_12.ResetSettingsHandler).toDynamicValue((context) => {
    return new public_12.ResetSettingsHandler(context.container.get('ISettingsRepository'), context.container.get('IAuditLogger'), context.container.get(EventBus_1.EventBus));
});
exports.container.bind(SettingsController_1.SettingsController).toDynamicValue((context) => {
    return new SettingsController_1.SettingsController(context.container.get(public_11.ChangeThemeHandler), context.container.get(public_11.GetSettingsHandler), context.container.get(public_12.UpdateSettingsHandler), context.container.get(public_12.UpdateLanguageHandler), context.container.get(public_12.UpdatePrivacyHandler), context.container.get(public_12.UpdateNotificationSettingsHandler), context.container.get(public_12.UpdateSecuritySettingsHandler), context.container.get(public_12.ResetSettingsHandler));
});
// Notification
exports.container.bind('INotificationRepository').toDynamicValue((context) => {
    return new public_1.PostgresNotificationRepository(context.container.get(PostgresProvider_1.PostgresProvider));
});
exports.container.bind(public_1.PreferenceService).toDynamicValue((context) => {
    return new public_1.PreferenceService(context.container.get('INotificationRepository'));
});
exports.container.bind(public_1.DeliveryService).toSelf();
exports.container.bind(NotificationService_1.NotificationService).toDynamicValue((context) => {
    return new NotificationService_1.NotificationService(context.container.get('INotificationRepository'), context.container.get(public_1.PreferenceService), context.container.get('EventBus'), context.container.get('IAuditLogger'));
});
exports.container.bind('IRelationshipRepository').toDynamicValue((context) => {
    return new PostgresRelationshipRepository_1.PostgresRelationshipRepository(context.container.get(PostgresProvider_1.PostgresProvider));
});
exports.container.bind('IOntologyService').toDynamicValue((context) => {
    return new OntologyIntegrationService_1.OntologyIntegrationService(context.container.get('IOntologyGraphService'));
});
exports.container.bind(CreateRelationshipHandler_1.CreateRelationshipHandler).toDynamicValue((context) => {
    return new CreateRelationshipHandler_1.CreateRelationshipHandler(context.container.get('IRelationshipRepository'), context.container.get('IOntologyService'), context.container.get('IAuditRepository'), context.container.get('EventBus'));
});
exports.container.bind(RelationshipService_1.RelationshipService).toDynamicValue((context) => {
    return new RelationshipService_1.RelationshipService(context.container.get('IRelationshipRepository'), context.container.get(RelationshipValidationService_1.RelationshipValidationService), context.container.get('EventBus'));
});
exports.container.bind(RelationshipController_1.RelationshipController).toSelf();
// Article
exports.container.bind('IArticleRepository').toDynamicValue((context) => {
    return new PostgresArticleRepository_1.PostgresArticleRepository(context.container.get(pg_1.Pool));
});
exports.container.bind(ArticleOntologyValidator_1.ArticleOntologyValidator).toDynamicValue((context) => {
    return new ArticleOntologyValidator_1.ArticleOntologyValidator(context.container.get('IOntologyGraphService'));
});
exports.container.bind(CreateArticleHandler_1.CreateArticleHandler).toDynamicValue((context) => {
    return new CreateArticleHandler_1.CreateArticleHandler(context.container.get('IArticleRepository'), context.container.get('IAuditLogger'));
});
// Graph
exports.container.bind('IGraphRepository').toDynamicValue((context) => {
    return new public_2.PostgresGraphRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('IGraphContextRetrievalService').toDynamicValue((context) => {
    return new GraphContextRetrievalService_1.GraphContextRetrievalService(context.container.get('IGraphRepository'));
});
exports.container.bind(public_9.OntologyValidator).toDynamicValue((context) => {
    return new public_9.OntologyValidator(context.container.get('IOntologyGraphService'));
});
exports.container.bind(public_3.CreateGraphNodeHandler).toDynamicValue((context) => {
    return new public_3.CreateGraphNodeHandler(context.container.get('IGraphRepository'), context.container.get(public_9.OntologyValidator), context.container.get('EventBus'), Logger_1.logger);
});
exports.container.bind(public_4.UpdateGraphNodeHandler).toDynamicValue((context) => {
    return new public_4.UpdateGraphNodeHandler(context.container.get('IGraphRepository'), context.container.get('EventBus'));
});
exports.container.bind(public_4.DeleteGraphNodeHandler).toDynamicValue((context) => {
    return new public_4.DeleteGraphNodeHandler(context.container.get('IGraphRepository'), context.container.get('EventBus'));
});
exports.container.bind(public_4.CreateGraphEdgeHandler).toDynamicValue((context) => {
    return new public_4.CreateGraphEdgeHandler(context.container.get('IGraphRepository'), context.container.get(public_9.OntologyValidator), context.container.get('EventBus'));
});
exports.container.bind(public_4.UpdateGraphEdgeHandler).toDynamicValue((context) => {
    return new public_4.UpdateGraphEdgeHandler(context.container.get('IGraphRepository'), context.container.get('EventBus'));
});
exports.container.bind(public_4.DeleteGraphEdgeHandler).toDynamicValue((context) => {
    return new public_4.DeleteGraphEdgeHandler(context.container.get('IGraphRepository'), context.container.get('EventBus'));
});
exports.container.bind(public_5.GetNodeHandler).toDynamicValue((context) => {
    return new public_5.GetNodeHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(public_6.SearchGraphHandler).toDynamicValue((context) => {
    return new public_6.SearchGraphHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(public_7.FindShortestPathHandler).toDynamicValue((context) => {
    return new public_7.FindShortestPathHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(public_8.GraphController).toDynamicValue((context) => {
    return new public_8.GraphController(context.container.get(public_3.CreateGraphNodeHandler), context.container.get(public_4.CreateGraphEdgeHandler), context.container.get(public_5.GetNodeHandler), context.container.get(public_6.SearchGraphHandler), context.container.get(public_7.FindShortestPathHandler));
});
//# sourceMappingURL=container.js.map