"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGraphNodeHandler = void 0;
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
const GraphEvents_1 = require("../../domain/events/GraphEvents");
const public_1 = require("../../../audit/public");
class CreateGraphNodeHandler {
    repository;
    ontologyValidator;
    eventBus;
    logger;
    constructor(repository, ontologyValidator, eventBus, logger) {
        this.repository = repository;
        this.ontologyValidator = ontologyValidator;
        this.eventBus = eventBus;
        this.logger = logger;
    }
    async handle(command, userId, ipAddress) {
        try {
            await this.ontologyValidator.validateNode(command.type);
            await this.ontologyValidator.validateMetadata(command.type, command.metadata);
            const node = new GraphEntities_1.GraphNode(command.entityId, command.type, [], command.metadata);
            await this.repository.saveNode(node);
            await this.eventBus.publish(new GraphEvents_1.GraphNodeCreatedEvent(command.entityId, command.type));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'CREATE_NODE',
                actorId: userId,
                actorType: 'USER',
                resourceId: command.entityId,
                resourceType: 'GRAPH_NODE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
            this.logger.info(`Node created: ${command.entityId}`, { entityId: command.entityId });
        }
        catch (error) {
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'CREATE_NODE',
                actorId: userId,
                actorType: 'USER',
                resourceId: command.entityId,
                resourceType: 'GRAPH_NODE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            this.logger.error(`Failed to create node: ${command.entityId}`, { error, entityId: command.entityId });
            throw error;
        }
    }
}
exports.CreateGraphNodeHandler = CreateGraphNodeHandler;
//# sourceMappingURL=CreateGraphNodeHandler.js.map