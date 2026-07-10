"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalEntityPolicy = exports.DuplicateEntityPolicy = exports.EntityArchivingPolicy = exports.EntityPublishingPolicy = void 0;
class EntityPublishingPolicy {
    async validate(entity) { }
}
exports.EntityPublishingPolicy = EntityPublishingPolicy;
class EntityArchivingPolicy {
    async validate(entity) { }
}
exports.EntityArchivingPolicy = EntityArchivingPolicy;
class DuplicateEntityPolicy {
    async validate(entity) { }
}
exports.DuplicateEntityPolicy = DuplicateEntityPolicy;
class CanonicalEntityPolicy {
    async validate(entity) { }
}
exports.CanonicalEntityPolicy = CanonicalEntityPolicy;
//# sourceMappingURL=EntityPolicies.js.map