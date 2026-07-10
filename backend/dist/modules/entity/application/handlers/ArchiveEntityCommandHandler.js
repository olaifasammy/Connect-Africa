"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityArchivedEvent_1 = require("../../../entity/domain/events/EntityArchivedEvent");
class ArchiveEntityCommandHandler {
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
        // Trigger Archive event
        await this.eventBus.publish(new EntityArchivedEvent_1.EntityArchivedEvent(entity));
        // Audit logging
        await this.auditRepository.log({
            user: userId,
            action: 'ARCHIVE_ENTITY',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.ArchiveEntityCommandHandler = ArchiveEntityCommandHandler;
//# sourceMappingURL=ArchiveEntityCommandHandler.js.map