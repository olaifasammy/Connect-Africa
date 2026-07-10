"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMergeService = void 0;
const EntityId_1 = require("../value-objects/EntityId");
class EntityMergeService {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async merge(sourceEntityId, targetEntityId) {
        const sourceEntity = await this.entityRepository.findById(EntityId_1.EntityId.create(sourceEntityId));
        const targetEntity = await this.entityRepository.findById(EntityId_1.EntityId.create(targetEntityId));
        if (!sourceEntity || !targetEntity) {
            throw new Error('Entity not found.');
        }
        // Perform merge
        targetEntity.merge(sourceEntity);
        // Save the merged target entity
        await this.entityRepository.save(targetEntity);
        return targetEntity;
    }
}
exports.EntityMergeService = EntityMergeService;
//# sourceMappingURL=EntityMergeService.js.map