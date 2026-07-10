"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeEntitiesCommandHandler = void 0;
const EntityMergedEvent_1 = require("../../../entity/domain/events/EntityMergedEvent");
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
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
        await this.auditRepository.log({
            user: userId,
            action: 'MERGE_ENTITIES',
            resource: `entity:${targetEntityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.MergeEntitiesCommandHandler = MergeEntitiesCommandHandler;
//# sourceMappingURL=MergeEntitiesCommandHandler.js.map