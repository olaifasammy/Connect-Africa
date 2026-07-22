"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntityVersionCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityVersionCreatedEvent_1 = require("../../../entity/domain/events/EntityVersionCreatedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class CreateEntityVersionCommandHandler {
    entityRepository;
    entityVersionService;
    eventBus;
    constructor(entityRepository, entityVersionService, eventBus) {
        this.entityRepository = entityRepository;
        this.entityVersionService = entityVersionService;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, userId } = command;
        const id = EntityId_1.EntityId.create(entityId);
        const entity = await this.entityRepository.findById(id);
        if (!entity) {
            throw new Error(`Entity with ID ${entityId} not found.`);
        }
        const version = await this.entityVersionService.createVersion(entity);
        // Publish domain events
        await this.eventBus.publish(new EntityVersionCreatedEvent_1.EntityVersionCreatedEvent(version));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'CREATE_ENTITY_VERSION',
            actorId: userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: `entity:${entityId}:version:${version.id}`,
            resourceType: 'ENTITY_VERSION',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.CreateEntityVersionCommandHandler = CreateEntityVersionCommandHandler;
//# sourceMappingURL=CreateEntityVersionCommandHandler.js.map