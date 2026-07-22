"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityPublishedEvent_1 = require("../../../entity/domain/events/EntityPublishedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class PublishEntityCommandHandler {
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
        // In a real scenario, we would trigger domain-level publishing logic
        // (e.g., entity.publish()). For this prototype, we trigger the event.
        await this.eventBus.publish(new EntityPublishedEvent_1.EntityPublishedEvent(entity));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'PUBLISH_ENTITY',
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
exports.PublishEntityCommandHandler = PublishEntityCommandHandler;
//# sourceMappingURL=PublishEntityCommandHandler.js.map