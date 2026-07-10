"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRelationshipTypeQueryHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class GetRelationshipTypeQueryHandler {
    relationshipTypeRepository;
    constructor(relationshipTypeRepository) {
        this.relationshipTypeRepository = relationshipTypeRepository;
    }
    async handle(query) {
        const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(query.id));
        if (!relationshipType) {
            throw new Error('Relationship Type not found');
        }
        return {
            id: relationshipType.id.toString(),
            name: relationshipType.name,
            description: relationshipType.description,
            sourceEntityTypeId: relationshipType.sourceEntityTypeId.toString(),
            targetEntityTypeId: relationshipType.targetEntityTypeId.toString()
        };
    }
}
exports.GetRelationshipTypeQueryHandler = GetRelationshipTypeQueryHandler;
//# sourceMappingURL=GetRelationshipTypeQueryHandler.js.map