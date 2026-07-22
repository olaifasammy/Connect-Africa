"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityMetadata_1 = require("../../../entity/domain/value-objects/EntityMetadata");
const EntityValidator_1 = require("../../../entity/domain/validators/EntityValidator");
const Entity_1 = require("../../../entity/domain/entities/Entity");
const EntityUpdatedEvent_1 = require("../../../entity/domain/events/EntityUpdatedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class UpdateEntityCommandHandler {
    entityRepository;
    eventBus;
    constructor(entityRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, dto, userId } = command;
        const entity = await this.entityRepository.findById(EntityId_1.EntityId.create(entityId));
        if (!entity) {
            throw new Error(`Entity with ID ${entityId} not found.`);
        }
        // Update entity properties
        if (dto.name) {
            // Assume Entity class has a method to update name
            // (In a real scenario, this would be validated via domain policies)
            // For now, updating metadata as defined in the domain aggregate
        }
        // In this simplified architecture, assuming Metadata update
        const updatedMetadata = EntityMetadata_1.EntityMetadata.create({
            description: dto.description || entity.metadata.description,
            source: dto.source || entity.metadata.source,
            tags: dto.tags || entity.metadata.tags
        });
        // Update entity (this logic should ideally be in a domain service or entity method)
        // For this prototype, using existing structure
        entity.merge(Entity_1.Entity.rehydrate(entity._id, entity.name, entity.type, updatedMetadata, entity.props.createdAt, new Date()));
        EntityValidator_1.EntityValidator.validate(entity);
        await this.entityRepository.save(entity);
        // Publish domain events
        await this.eventBus.publish(new EntityUpdatedEvent_1.EntityUpdatedEvent(entity));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_ENTITY',
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
exports.UpdateEntityCommandHandler = UpdateEntityCommandHandler;
//# sourceMappingURL=UpdateEntityCommandHandler.js.map