"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishEntityCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityPublishedEvent_1 = require("../../../entity/domain/events/EntityPublishedEvent");
const AuditEntry_1 = require("../../../audit/domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../../audit/domain/entities/AuditActor");
const AuditResource_1 = require("../../../audit/domain/entities/AuditResource");
const AuditMetadata_1 = require("../../../audit/domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../../audit/domain/value-objects/AuditValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
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
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: 'PUBLISH_ENTITY',
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
exports.PublishEntityCommandHandler = PublishEntityCommandHandler;
//# sourceMappingURL=PublishEntityCommandHandler.js.map