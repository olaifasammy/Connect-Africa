"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipDeletedHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RelationshipDeletedHandler {
    repository;
    relationshipRepository;
    constructor(repository, relationshipRepository) {
        this.repository = repository;
        this.relationshipRepository = relationshipRepository;
    }
    async handle(event) {
        const relationship = await this.relationshipRepository.findById(new UniqueEntityId_1.UniqueEntityId(event.relationshipId));
        if (relationship) {
            await this.repository.deleteEdge(relationship.sourceEntityId.getProps().value, relationship.targetEntityId.getProps().value, relationship.relationshipTypeId.getProps().value);
        }
    }
}
exports.RelationshipDeletedHandler = RelationshipDeletedHandler;
//# sourceMappingURL=RelationshipDeletedHandler.js.map