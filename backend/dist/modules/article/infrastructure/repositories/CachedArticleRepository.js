"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedArticleRepository = void 0;
class CachedArticleRepository {
    repository;
    cache;
    ttl;
    constructor(repository, cache, ttl = 3600) {
        this.repository = repository;
        this.cache = cache;
        this.ttl = ttl;
    }
    async findById(id) {
        const cacheKey = `article:id:${id.toString()}`;
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return JSON.parse(cached); // Note: Simple serialization, needs better mapping
        const article = await this.repository.findById(id);
        if (article) {
            await this.cache.set(cacheKey, JSON.stringify(article), this.ttl);
        }
        return article;
    }
    async findBySlug(slug) {
        const cacheKey = `article:slug:${slug}`;
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        const article = await this.repository.findBySlug(slug);
        if (article) {
            await this.cache.set(cacheKey, JSON.stringify(article), this.ttl);
        }
        return article;
    }
    async save(article) {
        await this.repository.save(article);
        await this.cache.delete(`article:id:${article.id.toString()}`);
        await this.cache.delete(`article:slug:${article.slug}`);
    }
    async delete(id) {
        const article = await this.repository.findById(id);
        if (article) {
            await this.cache.delete(`article:id:${id.toString()}`);
            await this.cache.delete(`article:slug:${article.slug}`);
        }
        await this.repository.delete(id);
    }
}
exports.CachedArticleRepository = CachedArticleRepository;
//# sourceMappingURL=CachedArticleRepository.js.map