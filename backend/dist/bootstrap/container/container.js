"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const PostgresEntityRepository_1 = require("../../modules/entity/infrastructure/PostgresEntityRepository");
const CreateEntityCommandHandler_1 = require("../../modules/entity/application/handlers/CreateEntityCommandHandler");
const EntityController_1 = require("../../modules/entity/interfaces/EntityController");
const PostgresRelationshipRepository_1 = require("../../modules/relationship/infrastructure/repositories/PostgresRelationshipRepository");
const CreateRelationshipHandler_1 = require("../../modules/relationship/application/handlers/CreateRelationshipHandler");
const PostgresSettingsRepository_1 = require("../../modules/settings/infrastructure/PostgresSettingsRepository");
const RelationshipController_1 = require("../../modules/relationship/interfaces/controllers/RelationshipController");
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
const PostgresGraphRepository_1 = require("../../modules/graph/infrastructure/PostgresGraphRepository");
const CreateGraphNodeHandler_1 = require("../../modules/graph/application/handlers/CreateGraphNodeHandler");
const CreateGraphEdgeHandler_1 = require("../../modules/graph/application/handlers/CreateGraphEdgeHandler");
const GetNodeHandler_1 = require("../../modules/graph/application/handlers/GetNodeHandler");
const SearchGraphHandler_1 = require("../../modules/graph/application/handlers/SearchGraphHandler");
const FindShortestPathHandler_1 = require("../../modules/graph/application/handlers/FindShortestPathHandler");
const GraphController_1 = require("../../modules/graph/interfaces/controllers/GraphController");
const OntologyValidator_1 = require("../../modules/graph/domain/services/OntologyValidator");
const Logger_1 = require("../../shared/logger/Logger");
const AuthenticationService_1 = require("../../modules/auth/domain/services/AuthenticationService");
exports.container = new inversify_1.Container();
exports.container.bind('IAuditLogger').to(AuditLogger_1.AuditLogger);
exports.container.bind(AuthenticationService_1.AuthenticationService).toDynamicValue((context) => {
    return new AuthenticationService_1.AuthenticationService(context.container.get('IPasswordHasher'), context.container.get('IAuditLogger'));
});
// Database/Infrastructure
const pool = PostgresProvider_1.PostgresProvider.getPool();
exports.container.bind(pg_1.Pool).toConstantValue(pool);
exports.container.bind(PostgresProvider_1.PostgresProvider).toSelf();
exports.container.bind('IAuditRepository').toDynamicValue((context) => {
    return new PostgresAuditRepository_1.PostgresAuditRepository(context.container.get(pg_1.Pool));
}).inSingletonScope();
exports.container.bind('IUserRepository').toDynamicValue((context) => {
    return new PostgresUserRepository_1.PostgresUserRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('IUserProfileRepository').toDynamicValue((context) => {
    return new PostgresUserProfileRepository_1.PostgresUserProfileRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('ISessionRepository').to(RedisSessionRepository_1.RedisSessionRepository);
exports.container.bind('IPasswordHasher').to(BcryptPasswordHasher_1.BcryptPasswordHasher);
exports.container.bind('IJwtProvider').to(JwtProvider_1.JwtProvider);
if (process.env.NODE_ENV === 'test') {
    exports.container.bind('EventBus').toConstantValue({ publish: jest.fn() });
}
else {
    exports.container.bind('EventBus').to(BullMqEventBus_1.BullMqEventBus);
}
const GetCurrentUserQueryHandler_1 = require("../../modules/auth/application/handlers/queries/GetCurrentUserQueryHandler");
const AuthenticationMiddleware_1 = require("../../shared/interfaces/http/middleware/AuthenticationMiddleware");
const SearchProvider_1 = require("../../modules/search/infrastructure/search/SearchProvider");
const PostgresSearchProvider_1 = require("../../modules/search/infrastructure/search/PostgresSearchProvider");
const SearchRepository_1 = require("../../modules/search/infrastructure/repositories/SearchRepository");
const SearchController_1 = require("../../modules/search/interfaces/controllers/SearchController");
const AutocompleteController_1 = require("../../modules/search/interfaces/controllers/AutocompleteController");
const SearchQueryHandler_1 = require("../../modules/search/application/handlers/SearchQueryHandler");
const AutocompleteQueryHandler_1 = require("../../modules/search/application/handlers/AutocompleteQueryHandler");
const PostgresAuditRepository_1 = require("../../modules/audit/infrastructure/audit/PostgresAuditRepository");
// ... (other imports)
// Search
exports.container.bind(SearchProvider_1.SearchProvider).to(PostgresSearchProvider_1.PostgresSearchProvider);
exports.container.bind('ISearchRepository').toDynamicValue((context) => {
    return new SearchRepository_1.SearchRepository(context.container.get(SearchProvider_1.SearchProvider));
});
exports.container.bind(SearchQueryHandler_1.SearchQueryHandler).toSelf();
exports.container.bind(AutocompleteQueryHandler_1.AutocompleteQueryHandler).toSelf();
exports.container.bind(SearchController_1.SearchController).toSelf();
exports.container.bind(AutocompleteController_1.AutocompleteController).toSelf();
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
    return new LoginCommandHandler_1.LoginCommandHandler(context.container.get('IUserRepository'), context.container.get('IPasswordHasher'), context.container.get('IJwtProvider'), context.container.get('IAuditRepository'), context.container.get('EventBus'));
});
exports.container.bind(LogoutCommandHandler_1.LogoutCommandHandler).toSelf();
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
exports.container.bind(BanUserCommandHandler_1.BanUserCommandHandler).toDynamicValue((context) => {
    return new BanUserCommandHandler_1.BanUserCommandHandler(context.container.get('IUserRepository'), context.container.get('EventBus'));
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
// Entity
exports.container.bind('IEntityRepository').to(PostgresEntityRepository_1.PostgresEntityRepository);
exports.container.bind(CreateEntityCommandHandler_1.CreateEntityCommandHandler).toDynamicValue((context) => {
    return new CreateEntityCommandHandler_1.CreateEntityCommandHandler(context.container.get('IEntityRepository'), context.container.get('IAuditRepository'), context.container.get('EventBus'));
});
exports.container.bind(EntityController_1.EntityController).toSelf();
// Settings
exports.container.bind('ISettingsRepository').toDynamicValue((context) => {
    return new PostgresSettingsRepository_1.PostgresSettingsRepository(context.container.get(PostgresProvider_1.PostgresProvider));
});
// Relationship
exports.container.bind('IRelationshipRepository').toDynamicValue((context) => {
    return new PostgresRelationshipRepository_1.PostgresRelationshipRepository(context.container.get(PostgresProvider_1.PostgresProvider));
});
exports.container.bind('IOntologyService').toConstantValue({ validateRelationshipType: async () => { } });
exports.container.bind('IAuditLogger').toConstantValue({ log: async () => { } }); // Should be bound to a real audit service
exports.container.bind(CreateRelationshipHandler_1.CreateRelationshipHandler).toDynamicValue((context) => {
    return new CreateRelationshipHandler_1.CreateRelationshipHandler(context.container.get('IRelationshipRepository'), context.container.get('IOntologyService'), context.container.get('IAuditLogger'), context.container.get('EventBus'));
});
exports.container.bind(RelationshipService_1.RelationshipService).toDynamicValue((context) => {
    return new RelationshipService_1.RelationshipService(context.container.get('IRelationshipRepository'), context.container.get(RelationshipValidationService_1.RelationshipValidationService), context.container.get('EventBus'));
});
exports.container.bind(RelationshipController_1.RelationshipController).toSelf();
// Graph
exports.container.bind('IGraphRepository').toDynamicValue((context) => {
    return new PostgresGraphRepository_1.PostgresGraphRepository(context.container.get(pg_1.Pool));
});
exports.container.bind('IOntologyGraphService').toConstantValue({ validateEntityType: async () => true, validateRelationshipType: async () => true });
exports.container.bind(OntologyValidator_1.OntologyValidator).toDynamicValue((context) => {
    return new OntologyValidator_1.OntologyValidator(context.container.get('IOntologyGraphService'));
});
exports.container.bind(CreateGraphNodeHandler_1.CreateGraphNodeHandler).toDynamicValue((context) => {
    return new CreateGraphNodeHandler_1.CreateGraphNodeHandler(context.container.get('IGraphRepository'), context.container.get(OntologyValidator_1.OntologyValidator), Logger_1.logger);
});
exports.container.bind(CreateGraphEdgeHandler_1.CreateGraphEdgeHandler).toDynamicValue((context) => {
    return new CreateGraphEdgeHandler_1.CreateGraphEdgeHandler(context.container.get('IGraphRepository'), context.container.get(OntologyValidator_1.OntologyValidator));
});
exports.container.bind(GetNodeHandler_1.GetNodeHandler).toDynamicValue((context) => {
    return new GetNodeHandler_1.GetNodeHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(SearchGraphHandler_1.SearchGraphHandler).toDynamicValue((context) => {
    return new SearchGraphHandler_1.SearchGraphHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(FindShortestPathHandler_1.FindShortestPathHandler).toDynamicValue((context) => {
    return new FindShortestPathHandler_1.FindShortestPathHandler(context.container.get('IGraphRepository'));
});
exports.container.bind(GraphController_1.GraphController).toDynamicValue((context) => {
    return new GraphController_1.GraphController(context.container.get(CreateGraphNodeHandler_1.CreateGraphNodeHandler), context.container.get(CreateGraphEdgeHandler_1.CreateGraphEdgeHandler), context.container.get(GetNodeHandler_1.GetNodeHandler), context.container.get(SearchGraphHandler_1.SearchGraphHandler), context.container.get(FindShortestPathHandler_1.FindShortestPathHandler));
});
//# sourceMappingURL=container.js.map