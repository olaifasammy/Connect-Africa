"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGraphNodeHandler = void 0;
const GraphEvents_1 = require("../../domain/events/GraphEvents");
const public_1 = require("../../../audit/public");
class UpdateGraphNodeHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command, userId, ipAddress) {
        try {
            await this.repository.updateNode(command.entityId, command.metadata);
            await this.eventBus.publish(new GraphEvents_1.GraphNodeUpdatedEvent(command.entityId, command.metadata));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'UPDATE_NODE',
                actorId: userId,
                actorType: 'USER',
                resourceId: command.entityId,
                resourceType: 'GRAPH_NODE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
        }
        catch (error) {
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'UPDATE_NODE',
                actorId: userId,
                actorType: 'USER',
                resourceId: command.entityId,
                resourceType: 'GRAPH_NODE',
                ipAddress: ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            throw error;
        }
    }
}
exports.UpdateGraphNodeHandler = UpdateGraphNodeHandler;
//# sourceMappingURL=UpdateGraphNodeHandler.js.map