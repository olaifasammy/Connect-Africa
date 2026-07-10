"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateRelationshipPolicy = void 0;
/**
 * Policy to detect duplicate relationships.
 */
class DuplicateRelationshipPolicy {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async validate(relationship) {
        const exists = await this.repository.exists(relationship);
        if (exists) {
            throw new Error('Business Rule Violation: Relationship already exists.');
        }
    }
}
exports.DuplicateRelationshipPolicy = DuplicateRelationshipPolicy;
//# sourceMappingURL=DuplicateRelationshipPolicy.js.map