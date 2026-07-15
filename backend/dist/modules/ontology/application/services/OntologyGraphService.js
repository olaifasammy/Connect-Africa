"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyGraphService = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class OntologyGraphService {
    entityTypeRepository;
    relationshipTypeRepository;
    constructor(entityTypeRepository, relationshipTypeRepository) {
        this.entityTypeRepository = entityTypeRepository;
        this.relationshipTypeRepository = relationshipTypeRepository;
    }
    async validateEntityType(entityTypeId) {
        const entityType = await this.entityTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(entityTypeId));
        return !!entityType;
    }
    async validateRelationshipType(relationshipTypeId, sourceEntityTypeId, targetEntityTypeId) {
        const relType = await this.relationshipTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(relationshipTypeId));
        if (!relType)
            return false;
        return (relType.sourceEntityTypeId.equals(new UniqueEntityId_1.UniqueEntityId(sourceEntityTypeId)) &&
            relType.targetEntityTypeId.equals(new UniqueEntityId_1.UniqueEntityId(targetEntityTypeId)));
    }
    async validateCardinality(relationshipTypeId, sourceEntityTypeId) {
        const relType = await this.relationshipTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(relationshipTypeId));
        if (!relType)
            return false;
        // Logic to check cardinality constraints based on the relationship definition
        // For now, this is a stub as per the requirement in Phase 3
        return true;
    }
    async validateMetadataSchema(entityTypeId, metadata) {
        const entityType = await this.entityTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(entityTypeId));
        if (!entityType)
            return false;
        // Logic to validate metadata against the entityType definition
        // For now, this is a stub
        return true;
    }
}
exports.OntologyGraphService = OntologyGraphService;
//# sourceMappingURL=OntologyGraphService.js.map