"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNameUniquenessPolicy = void 0;
class EntityNameUniquenessPolicy {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    } // Should be a repository interface
    async validate(entity) {
        // Implementation will use repository to check uniqueness
        const existing = await this.entityRepository.findByName(entity.name.value);
        if (existing && !existing.id.equals(entity.id)) {
            throw new Error('Entity name must be unique');
        }
    }
}
exports.EntityNameUniquenessPolicy = EntityNameUniquenessPolicy;
//# sourceMappingURL=EntityNameUniquenessPolicy.js.map