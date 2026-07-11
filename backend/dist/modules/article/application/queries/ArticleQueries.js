"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchArticlesQuery = exports.GetArticleBySlugQuery = exports.GetArticleQuery = exports.GetArticlesByCategoryQuery = exports.GetArticlesByEntityQuery = exports.GetLatestArticlesQuery = void 0;
class GetLatestArticlesQuery {
    limit;
    constructor(limit = 10) {
        this.limit = limit;
    }
}
exports.GetLatestArticlesQuery = GetLatestArticlesQuery;
class GetArticlesByEntityQuery {
    entityId;
    constructor(entityId) {
        this.entityId = entityId;
    }
}
exports.GetArticlesByEntityQuery = GetArticlesByEntityQuery;
class GetArticlesByCategoryQuery {
    category;
    constructor(category) {
        this.category = category;
    }
}
exports.GetArticlesByCategoryQuery = GetArticlesByCategoryQuery;
class GetArticleQuery {
    articleId;
    constructor(articleId) {
        this.articleId = articleId;
    }
}
exports.GetArticleQuery = GetArticleQuery;
class GetArticleBySlugQuery {
    slug;
    constructor(slug) {
        this.slug = slug;
    }
}
exports.GetArticleBySlugQuery = GetArticleBySlugQuery;
class SearchArticlesQuery {
    searchTerm;
    constructor(searchTerm) {
        this.searchTerm = searchTerm;
    }
}
exports.SearchArticlesQuery = SearchArticlesQuery;
//# sourceMappingURL=ArticleQueries.js.map