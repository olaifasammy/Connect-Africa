"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueRelationshipTypePolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class UniqueRelationshipTypePolicy {
    relationshipTypeRepository;
    constructor(relationshipTypeRepository) {
        this.relationshipTypeRepository = relationshipTypeRepository;
    }
    async validate(name) {
        const relationshipType = await this.relationshipTypeRepository.findByName(name);
        if (relationshipType) {
            throw new DomainError_1.DomainError(`Relationship type with name '${name}' already exists.`);
        }
    }
}
exports.UniqueRelationshipTypePolicy = UniqueRelationshipTypePolicy;
//# sourceMappingURL=UniqueRelationshipTypePolicy.js.map