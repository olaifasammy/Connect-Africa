"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleHandler = void 0;
class UpdateArticleHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.update(command.title, command.summary, command.content);
        await this.repository.save(article);
    }
}
exports.UpdateArticleHandler = UpdateArticleHandler;
//# sourceMappingURL=UpdateArticleHandler.js.map