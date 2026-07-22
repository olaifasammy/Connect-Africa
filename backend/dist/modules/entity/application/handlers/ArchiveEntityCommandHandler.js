"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityArchivedEvent_1 = require("../../../entity/domain/events/EntityArchivedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class ArchiveEntityCommandHandler {
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
        // Trigger Archive event
        await this.eventBus.publish(new EntityArchivedEvent_1.EntityArchivedEvent(entity));
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'ARCHIVE_ENTITY',
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
exports.ArchiveEntityCommandHandler = ArchiveEntityCommandHandler;
//# sourceMappingURL=ArchiveEntityCommandHandler.js.map