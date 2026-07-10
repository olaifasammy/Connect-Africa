"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipValidationService = void 0;
/**
 * Service responsible for orchestrating relationship validation against defined domain policies.
 */
class RelationshipValidationService {
    policies;
    constructor(policies) {
        this.policies = policies;
    }
    async validate(relationship) {
        for (const policy of this.policies) {
            await policy.validate(relationship);
        }
    }
}
exports.RelationshipValidationService = RelationshipValidationService;
//# sourceMappingURL=RelationshipValidationService.js.map