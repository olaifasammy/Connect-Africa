"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityMetadata_1 = require("../../../entity/domain/value-objects/EntityMetadata");
const EntityValidator_1 = require("../../../entity/domain/validators/EntityValidator");
const Entity_1 = require("../../../entity/domain/entities/Entity");
const EntityUpdatedEvent_1 = require("../../../entity/domain/events/EntityUpdatedEvent");
const AuditEntry_1 = require("../../../audit/domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../../audit/domain/entities/AuditActor");
const AuditResource_1 = require("../../../audit/domain/entities/AuditResource");
const AuditMetadata_1 = require("../../../audit/domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../../audit/domain/value-objects/AuditValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UpdateEntityCommandHandler {
    entityRepository;
    auditRepository;
    eventBus;
    constructor(entityRepository, auditRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: 'UPDATE_ENTITY',
            actor: AuditActor_1.AuditActor.create({
                userId: new AuditValueObjects_1.UserId(userId),
                actorType: 'USER',
                ipAddress: new AuditValueObjects_1.IPAddress('127.0.0.1'),
                userAgent: new AuditValueObjects_1.UserAgent('unknown')
            }),
            resource: AuditResource_1.AuditResource.create({
                id: new AuditValueObjects_1.ResourceId(entityId),
                type: 'ENTITY'
            }),
            metadata: [AuditMetadata_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new AuditValueObjects_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new AuditValueObjects_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdateEntityCommandHandler = UpdateEntityCommandHandler;
//# sourceMappingURL=UpdateEntityCommandHandler.js.map