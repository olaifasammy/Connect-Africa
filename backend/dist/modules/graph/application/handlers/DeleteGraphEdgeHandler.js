"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGraphEdgeHandler = void 0;
const GraphEvents_1 = require("../../domain/events/GraphEvents");
const public_1 = require("../../../audit/public");
class DeleteGraphEdgeHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command, userId, ipAddress) {
        try {
            await this.repository.deleteEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType);
            await this.eventBus.publish(new GraphEvents_1.GraphEdgeDeletedEvent(command.sourceEntityId, command.targetEntityId, command.relationshipType));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'DELETE_EDGE',
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
                action: 'DELETE_EDGE',
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
exports.DeleteGraphEdgeHandler = DeleteGraphEdgeHandler;
//# sourceMappingURL=DeleteGraphEdgeHandler.js.map