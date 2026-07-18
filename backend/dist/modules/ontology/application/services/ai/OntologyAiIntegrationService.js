"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyAiIntegrationService = void 0;
class OntologyAiIntegrationService {
    suggestionService;
    constructor(suggestionService) {
        this.suggestionService = suggestionService;
    }
    async requestTaxonomySuggestions(content) {
        return this.suggestionService.suggest(content);
    }
}
exports.OntologyAiIntegrationService = OntologyAiIntegrationService;
//# sourceMappingURL=OntologyAiIntegrationService.js.map