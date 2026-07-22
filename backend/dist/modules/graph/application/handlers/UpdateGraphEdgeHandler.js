"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGraphEdgeHandler = void 0;
const GraphEvents_1 = require("../../domain/events/GraphEvents");
const public_1 = require("../../../audit/public");
class UpdateGraphEdgeHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command, userId, ipAddress) {
        try {
            await this.repository.runInTransaction(async (client) => {
                await this.repository.updateEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, command.properties);
            });
            await this.eventBus.publish(new GraphEvents_1.GraphEdgeUpdatedEvent(command.sourceEntityId, command.targetEntityId, command.relationshipType, command.properties));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'UPDATE_EDGE',
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
                action: 'UPDATE_EDGE',
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
exports.UpdateGraphEdgeHandler = UpdateGraphEdgeHandler;
//# sourceMappingURL=UpdateGraphEdgeHandler.js.map