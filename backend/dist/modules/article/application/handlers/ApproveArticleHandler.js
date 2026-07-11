"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveArticleHandler = void 0;
class ApproveArticleHandler {
    repository;
    auditLogger;
    constructor(repository, auditLogger) {
        this.repository = repository;
        this.auditLogger = auditLogger;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.approve();
        await this.repository.save(article);
        await this.auditLogger.log('ARTICLE_APPROVED', { articleId: command.articleId.toString() });
    }
}
exports.ApproveArticleHandler = ApproveArticleHandler;
//# sourceMappingURL=ApproveArticleHandler.js.map