"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipAiIntegrationService = void 0;
class RelationshipAiIntegrationService {
    suggestionService;
    constructor(suggestionService) {
        this.suggestionService = suggestionService;
    }
    async suggestRelationships(entities) {
        return this.suggestionService.suggest(entities);
    }
}
exports.RelationshipAiIntegrationService = RelationshipAiIntegrationService;
//# sourceMappingURL=RelationshipAiIntegrationService.js.map