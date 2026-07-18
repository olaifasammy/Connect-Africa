"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeEntitiesCommandHandler = void 0;
const EntityMergedEvent_1 = require("../../../entity/domain/events/EntityMergedEvent");
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const AuditEntry_1 = require("../../../audit/domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../../audit/domain/entities/AuditActor");
const AuditResource_1 = require("../../../audit/domain/entities/AuditResource");
const AuditMetadata_1 = require("../../../audit/domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../../audit/domain/value-objects/AuditValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class MergeEntitiesCommandHandler {
    entityMergeService;
    auditRepository;
    eventBus;
    constructor(entityMergeService, auditRepository, eventBus) {
        this.entityMergeService = entityMergeService;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { sourceEntityId, targetEntityId, userId } = command;
        const mergedEntity = await this.entityMergeService.merge(sourceEntityId, targetEntityId);
        // Publish domain events
        await this.eventBus.publish(new EntityMergedEvent_1.EntityMergedEvent(EntityId_1.EntityId.create(sourceEntityId), EntityId_1.EntityId.create(targetEntityId)));
        // Audit logging
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: 'MERGE_ENTITIES',
            actor: AuditActor_1.AuditActor.create({
                userId: new AuditValueObjects_1.UserId(userId),
                actorType: 'USER',
                ipAddress: new AuditValueObjects_1.IPAddress('127.0.0.1'),
                userAgent: new AuditValueObjects_1.UserAgent('unknown')
            }),
            resource: AuditResource_1.AuditResource.create({
                id: new AuditValueObjects_1.ResourceId(targetEntityId),
                type: 'ENTITY'
            }),
            metadata: [AuditMetadata_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new AuditValueObjects_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new AuditValueObjects_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.MergeEntitiesCommandHandler = MergeEntitiesCommandHandler;
//# sourceMappingURL=MergeEntitiesCommandHandler.js.map