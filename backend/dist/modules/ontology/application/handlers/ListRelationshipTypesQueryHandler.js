"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRelationshipTypesQueryHandler = void 0;
class ListRelationshipTypesQueryHandler {
    relationshipTypeRepository;
    constructor(relationshipTypeRepository) {
        this.relationshipTypeRepository = relationshipTypeRepository;
    }
    async handle(query) {
        // Assuming repository needs extension to support findByOntologyId
        return [];
    }
}
exports.ListRelationshipTypesQueryHandler = ListRelationshipTypesQueryHandler;
//# sourceMappingURL=ListRelationshipTypesQueryHandler.js.map