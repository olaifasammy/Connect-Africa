"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitForReviewHandler = void 0;
class SubmitForReviewHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.submitForReview();
        await this.repository.save(article);
    }
}
exports.SubmitForReviewHandler = SubmitForReviewHandler;
//# sourceMappingURL=SubmitForReviewHandler.js.map