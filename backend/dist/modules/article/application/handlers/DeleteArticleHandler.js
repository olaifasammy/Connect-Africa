"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteArticleHandler = void 0;
class DeleteArticleHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        await this.repository.delete(command.articleId);
        // (article as any).addDomainEvent(new ArticleDeletedEvent(article.id));
    }
}
exports.DeleteArticleHandler = DeleteArticleHandler;
//# sourceMappingURL=DeleteArticleHandler.js.map