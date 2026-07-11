"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArticlesByCategoryHandler = exports.GetArticlesByEntityHandler = exports.GetLatestArticlesHandler = exports.SearchArticlesHandler = exports.GetArticleBySlugHandler = exports.GetArticleHandler = void 0;
class GetArticleHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return await this.repository.findById(query.articleId);
    }
}
exports.GetArticleHandler = GetArticleHandler;
class GetArticleBySlugHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return await this.repository.findBySlug(query.slug);
    }
}
exports.GetArticleBySlugHandler = GetArticleBySlugHandler;
class SearchArticlesHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return [];
    }
}
exports.SearchArticlesHandler = SearchArticlesHandler;
class GetLatestArticlesHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return [];
    }
}
exports.GetLatestArticlesHandler = GetLatestArticlesHandler;
class GetArticlesByEntityHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return [];
    }
}
exports.GetArticlesByEntityHandler = GetArticlesByEntityHandler;
class GetArticlesByCategoryHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return [];
    }
}
exports.GetArticlesByCategoryHandler = GetArticlesByCategoryHandler;
//# sourceMappingURL=ArticleQueryHandlers.js.map