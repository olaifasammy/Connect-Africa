"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreArticleHandler = void 0;
class RestoreArticleHandler {
    repository;
    revisionRepository;
    constructor(repository, revisionRepository) {
        this.repository = repository;
        this.revisionRepository = revisionRepository;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        // Assuming revision exists. In real app, need to fetch from repository
        // const revision = await this.revisionRepository.findById(command.revisionId);
        // For this implementation, we assume logic is in Revision entity
        // article.restoreFromRevision(revision);
        await this.repository.save(article);
    }
}
exports.RestoreArticleHandler = RestoreArticleHandler;
//# sourceMappingURL=RestoreArticleHandler.js.map