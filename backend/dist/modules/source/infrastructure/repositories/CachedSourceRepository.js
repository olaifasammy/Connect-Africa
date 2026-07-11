"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedSourceRepository = void 0;
class CachedSourceRepository {
    repository;
    cache;
    ttl;
    constructor(repository, cache, ttl = 3600) {
        this.repository = repository;
        this.cache = cache;
        this.ttl = ttl;
    }
    async findById(id) {
        const cacheKey = `source:id:${id.toString()}`;
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return JSON.parse(cached); // Note: Simple serialization, needs better mapping
        const source = await this.repository.findById(id);
        if (source) {
            await this.cache.set(cacheKey, JSON.stringify(source), this.ttl);
        }
        return source;
    }
    async save(source) {
        await this.repository.save(source);
        await this.cache.delete(`source:id:${source.id.toString()}`);
    }
    async delete(id) {
        await this.repository.delete(id);
        await this.cache.delete(`source:id:${id.toString()}`);
    }
}
exports.CachedSourceRepository = CachedSourceRepository;
//# sourceMappingURL=CachedSourceRepository.js.map