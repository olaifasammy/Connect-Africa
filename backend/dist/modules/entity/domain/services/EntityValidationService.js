"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityValidationService = void 0;
const EntityNameUniquenessPolicy_1 = require("../policies/EntityNameUniquenessPolicy");
const EntityTypeValidationPolicy_1 = require("../policies/EntityTypeValidationPolicy");
const UniqueSlugPolicy_1 = require("../policies/UniqueSlugPolicy");
class EntityValidationService {
    entityRepository;
    policies;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
        this.policies = [
            new EntityNameUniquenessPolicy_1.EntityNameUniquenessPolicy(this.entityRepository),
            new EntityTypeValidationPolicy_1.EntityTypeValidationPolicy(),
            new UniqueSlugPolicy_1.UniqueSlugPolicy(this.entityRepository),
        ];
    }
    async validate(entity) {
        for (const policy of this.policies) {
            await policy.validate(entity);
        }
    }
}
exports.EntityValidationService = EntityValidationService;
//# sourceMappingURL=EntityValidationService.js.map