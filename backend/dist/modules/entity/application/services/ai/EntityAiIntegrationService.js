"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAiIntegrationService = void 0;
class EntityAiIntegrationService {
    suggestionService;
    constructor(suggestionService) {
        this.suggestionService = suggestionService;
    }
    async suggestEntities(content) {
        return this.suggestionService.suggest(content);
    }
}
exports.EntityAiIntegrationService = EntityAiIntegrationService;
//# sourceMappingURL=EntityAiIntegrationService.js.map