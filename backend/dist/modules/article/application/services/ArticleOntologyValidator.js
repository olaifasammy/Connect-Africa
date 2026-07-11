"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleOntologyValidator = void 0;
class ArticleOntologyValidator {
    entityTypeRepository;
    relationshipTypeRepository;
    constructor(entityTypeRepository, relationshipTypeRepository) {
        this.entityTypeRepository = entityTypeRepository;
        this.relationshipTypeRepository = relationshipTypeRepository;
    }
    async validateEntityType(typeName) {
        const type = await this.entityTypeRepository.findByName(typeName);
        return !!type;
    }
    async validateRelationshipType(typeName) {
        const type = await this.relationshipTypeRepository.findByName(typeName);
        return !!type;
    }
}
exports.ArticleOntologyValidator = ArticleOntologyValidator;
//# sourceMappingURL=ArticleOntologyValidator.js.map