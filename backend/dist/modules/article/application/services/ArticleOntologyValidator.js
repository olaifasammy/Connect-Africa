"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleOntologyValidator = void 0;
class ArticleOntologyValidator {
    ontologyGraphService;
    constructor(ontologyGraphService) {
        this.ontologyGraphService = ontologyGraphService;
    }
    async validateEntityType(typeId) {
        return await this.ontologyGraphService.validateEntityType(typeId);
    }
    async validateRelationshipType(relationshipTypeId, sourceEntityTypeId, targetEntityTypeId) {
        return await this.ontologyGraphService.validateRelationshipType(relationshipTypeId, sourceEntityTypeId, targetEntityTypeId);
    }
}
exports.ArticleOntologyValidator = ArticleOntologyValidator;
//# sourceMappingURL=ArticleOntologyValidator.js.map