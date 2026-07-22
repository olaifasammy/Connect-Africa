"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeEntitiesCommandHandler = void 0;
const EntityMergedEvent_1 = require("../../../entity/domain/events/EntityMergedEvent");
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class MergeEntitiesCommandHandler {
    entityMergeService;
    eventBus;
    constructor(entityMergeService, eventBus) {
        this.entityMergeService = entityMergeService;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { sourceEntityId, targetEntityId, userId } = command;
        const mergedEntity = await this.entityMergeService.merge(sourceEntityId, targetEntityId);
        // Publish domain events
        await this.eventBus.publish(new EntityMergedEvent_1.EntityMergedEvent(EntityId_1.EntityId.create(sourceEntityId), EntityId_1.EntityId.create(targetEntityId)));
        // Audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'MERGE_ENTITIES',
            actorId: userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: targetEntityId,
            resourceType: 'ENTITY',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.MergeEntitiesCommandHandler = MergeEntitiesCommandHandler;
//# sourceMappingURL=MergeEntitiesCommandHandler.js.map