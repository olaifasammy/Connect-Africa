"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveArticleHandler = void 0;
class ArchiveArticleHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.archive();
        await this.repository.save(article);
    }
}
exports.ArchiveArticleHandler = ArchiveArticleHandler;
//# sourceMappingURL=ArchiveArticleHandler.js.map