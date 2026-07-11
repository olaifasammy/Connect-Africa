"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishArticleHandler = void 0;
class PublishArticleHandler {
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
        article.publish();
        await this.repository.save(article);
        await this.auditLogger.log('ARTICLE_PUBLISHED', { articleId: command.articleId.toString() });
    }
}
exports.PublishArticleHandler = PublishArticleHandler;
//# sourceMappingURL=PublishArticleHandler.js.map