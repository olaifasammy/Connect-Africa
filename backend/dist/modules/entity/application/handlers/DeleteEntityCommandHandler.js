"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityDeletedEvent_1 = require("../../../entity/domain/events/EntityDeletedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class DeleteEntityCommandHandler {
    entityRepository;
    eventBus;
    constructor(entityRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, userId } = command;
        const id = EntityId_1.EntityId.create(entityId);
        const entity = await this.entityRepository.findById(id);
        if (!entity) {
            throw new Error(`Entity with ID ${entityId} not found.`);
        }
        await this.entityRepository.delete(id);
        // Publish domain events
        await this.eventBus.publish(new EntityDeletedEvent_1.EntityDeletedEvent(id));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'DELETE_ENTITY',
            actorId: userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: entityId,
            resourceType: 'ENTITY',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.DeleteEntityCommandHandler = DeleteEntityCommandHandler;
//# sourceMappingURL=DeleteEntityCommandHandler.js.map