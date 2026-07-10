"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityDeletedEvent_1 = require("../../../entity/domain/events/EntityDeletedEvent");
class DeleteEntityCommandHandler {
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
        await this.entityRepository.delete(id);
        // Publish domain events
        await this.eventBus.publish(new EntityDeletedEvent_1.EntityDeletedEvent(id));
        // Audit logging
        await this.auditRepository.log({
            user: userId,
            action: 'DELETE_ENTITY',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.DeleteEntityCommandHandler = DeleteEntityCommandHandler;
//# sourceMappingURL=DeleteEntityCommandHandler.js.map