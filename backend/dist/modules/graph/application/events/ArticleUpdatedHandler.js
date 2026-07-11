"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleUpdatedHandler = void 0;
class ArticleUpdatedHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(event) {
        // ArticleUpdatedEvent provides articleId and entityIds it links to.
        for (const entityId of event.entityIds) {
            const node = await this.repository.findById(entityId.toString());
            if (node) {
                node.updateMetadata({ lastArticleUpdate: event.articleId.toString() });
                await this.repository.updateNode(node.entityId, node.metadata);
            }
        }
    }
}
exports.ArticleUpdatedHandler = ArticleUpdatedHandler;
//# sourceMappingURL=ArticleUpdatedHandler.js.map