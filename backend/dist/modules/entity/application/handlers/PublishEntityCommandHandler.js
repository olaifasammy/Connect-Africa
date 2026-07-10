"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityPublishedEvent_1 = require("../../../entity/domain/events/EntityPublishedEvent");
class PublishEntityCommandHandler {
    entityRepository;
    auditRepository;
    eventBus;
    constructor(entityRepository, auditRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.auditRepository = auditRepository;
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
        await this.auditRepository.log({
            user: userId,
            action: 'PUBLISH_ENTITY',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.PublishEntityCommandHandler = PublishEntityCommandHandler;
//# sourceMappingURL=PublishEntityCommandHandler.js.map