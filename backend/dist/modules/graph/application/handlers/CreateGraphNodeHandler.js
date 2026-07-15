"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGraphNodeHandler = void 0;
const GraphAggregate_1 = require("../../domain/entities/GraphAggregate");
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class CreateGraphNodeHandler {
    repository;
    ontologyValidator;
    logger;
    constructor(repository, ontologyValidator, logger) {
        this.repository = repository;
        this.ontologyValidator = ontologyValidator;
        this.logger = logger;
    }
    async handle(command, userId, ipAddress) {
        try {
            await this.ontologyValidator.validateNode(command.type);
            await this.ontologyValidator.validateMetadata(command.type, command.metadata);
            const node = new GraphEntities_1.GraphNode(command.entityId, command.type, [], command.metadata);
            const aggregate = new GraphAggregate_1.GraphAggregate([node], []);
            await this.repository.saveNode(node);
            this.logger.info(`Node created: ${command.entityId}`, { entityId: command.entityId });
            AuditLogger_1.AuditLogger.log({
                status: 'SUCCESS',
                action: 'CREATE_NODE',
                resource: command.entityId,
                user: userId,
                ipAddress
            });
        }
        catch (error) {
            this.logger.error(`Failed to create node: ${command.entityId}`, { error, entityId: command.entityId });
            throw error;
        }
    }
}
exports.CreateGraphNodeHandler = CreateGraphNodeHandler;
//# sourceMappingURL=CreateGraphNodeHandler.js.map