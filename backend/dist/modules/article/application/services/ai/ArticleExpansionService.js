"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleExpansionService = void 0;
class ArticleExpansionService {
    expansionService;
    knowledgeGapService;
    constructor(expansionService, knowledgeGapService) {
        this.expansionService = expansionService;
        this.knowledgeGapService = knowledgeGapService;
    }
    async expandArticle(content, articleId) {
        try {
            // 1. Request expansion from AI Bounded Context
            const expandedContent = await this.expansionService.requestExpansion(content);
            return expandedContent;
        }
        catch (error) {
            // 2. Log knowledge gap if expansion fails or indicates missing knowledge
            await this.knowledgeGapService.recordGap(`Article:${articleId}`, content);
            throw new Error('Expansion service unavailable');
        }
    }
}
exports.ArticleExpansionService = ArticleExpansionService;
//# sourceMappingURL=ArticleExpansionService.js.map