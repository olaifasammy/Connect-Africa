"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityRestoredEvent_1 = require("../../../entity/domain/events/EntityRestoredEvent");
class RestoreEntityCommandHandler {
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
        // Trigger Restore event
        await this.eventBus.publish(new EntityRestoredEvent_1.EntityRestoredEvent(entity));
        // Audit logging
        await this.auditRepository.log({
            user: userId,
            action: 'RESTORE_ENTITY',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.RestoreEntityCommandHandler = RestoreEntityCommandHandler;
//# sourceMappingURL=RestoreEntityCommandHandler.js.map