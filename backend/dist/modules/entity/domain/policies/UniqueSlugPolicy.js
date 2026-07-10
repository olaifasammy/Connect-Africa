"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueSlugPolicy = void 0;
/**
 * Policy to validate unique entity slugs.
 */
class UniqueSlugPolicy {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async validate(entity) {
        const slug = entity.metadata.slug;
        if (!slug) {
            throw new Error('Business Rule Violation: Entity slug is required for uniqueness validation.');
        }
        const exists = await this.repository.existsBySlug(slug);
        if (exists) {
            throw new Error('Business Rule Violation: Entity slug must be unique.');
        }
    }
}
exports.UniqueSlugPolicy = UniqueSlugPolicy;
//# sourceMappingURL=UniqueSlugPolicy.js.map