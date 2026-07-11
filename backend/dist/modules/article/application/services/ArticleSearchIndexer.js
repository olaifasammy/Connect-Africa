"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSearchIndexer = void 0;
class ArticleSearchIndexer {
    static toDocument(article) {
        return {
            id: article.id.toString(),
            title: article.title,
            summary: article.summary,
            content: article.content,
            tags: article.tags.map(t => t.value),
            categories: article.categories.map(c => c.name),
            status: article.status,
        };
    }
}
exports.ArticleSearchIndexer = ArticleSearchIndexer;
//# sourceMappingURL=ArticleSearchIndexer.js.map