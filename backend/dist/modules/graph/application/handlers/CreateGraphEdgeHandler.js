"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGraphEdgeHandler = void 0;
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
const GraphEvents_1 = require("../../domain/events/GraphEvents");
const public_1 = require("../../../audit/public");
class CreateGraphEdgeHandler {
    repository;
    ontologyValidator;
    eventBus;
    constructor(repository, ontologyValidator, eventBus) {
        this.repository = repository;
        this.ontologyValidator = ontologyValidator;
        this.eventBus = eventBus;
    }
    async handle(command, userId, ipAddress) {
        try {
            const sourceNode = await this.repository.findById(command.sourceEntityId);
            const targetNode = await this.repository.findById(command.targetEntityId);
            if (!sourceNode || !targetNode) {
                throw new Error('Source or target node not found');
            }
            await this.ontologyValidator.validateEdge(command.relationshipType, sourceNode.type, targetNode.type);
            await this.ontologyValidator.validateCardinality(command.relationshipType, sourceNode.type);
            const edge = new GraphEntities_1.GraphEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, {});
            await this.repository.saveEdge(edge);
            await this.eventBus.publish(new GraphEvents_1.GraphEdgeCreatedEvent(command.sourceEntityId, command.targetEntityId, command.relationshipType));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'CREATE_EDGE',
                actorId: userId,
                actorType: 'USER',
                resourceId: `${command.sourceEntityId}-${command.targetEntityId}`,
                resourceType: 'GRAPH_EDGE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
        }
        catch (error) {
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'CREATE_EDGE',
                actorId: userId,
                actorType: 'USER',
                resourceId: `${command.sourceEntityId}-${command.targetEntityId}`,
                resourceType: 'GRAPH_EDGE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            throw error;
        }
    }
}
exports.CreateGraphEdgeHandler = CreateGraphEdgeHandler;
//# sourceMappingURL=CreateGraphEdgeHandler.js.map