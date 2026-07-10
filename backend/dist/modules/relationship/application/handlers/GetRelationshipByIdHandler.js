"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRelationshipByIdHandler = void 0;
const RelationshipValueObjects_1 = require("../../../relationship/domain/value-objects/RelationshipValueObjects");
class GetRelationshipByIdHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        const relationship = await this.repository.findById(new RelationshipValueObjects_1.RelationshipId(query.id));
        if (!relationship)
            return null;
        return {
            id: relationship.id.toString(),
            sourceEntityId: relationship.sourceEntityId.getProps().value,
            targetEntityId: relationship.targetEntityId.getProps().value,
            relationshipTypeId: relationship.relationshipTypeId.getProps().value,
            status: 'ACTIVE',
            createdAt: relationship.createdAt,
            updatedAt: relationship.createdAt
        };
    }
}
exports.GetRelationshipByIdHandler = GetRelationshipByIdHandler;
//# sourceMappingURL=GetRelationshipByIdHandler.js.map