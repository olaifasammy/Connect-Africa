"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityRestoredEvent_1 = require("../../../entity/domain/events/EntityRestoredEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class RestoreEntityCommandHandler {
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
        // Trigger Restore event
        await this.eventBus.publish(new EntityRestoredEvent_1.EntityRestoredEvent(entity));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'RESTORE_ENTITY',
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
exports.RestoreEntityCommandHandler = RestoreEntityCommandHandler;
//# sourceMappingURL=RestoreEntityCommandHandler.js.map