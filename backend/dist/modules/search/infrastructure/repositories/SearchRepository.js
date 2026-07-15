"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepository = void 0;
class SearchRepository {
    searchProvider;
    constructor(searchProvider) {
        this.searchProvider = searchProvider;
    }
    async findById(id) {
        return await this.searchProvider.findById(id.toString());
    }
    async save(document) {
        // Determine if it should be index or update.
        // For now, let's treat it as an upsert call.
        // If we have a findById, we can check.
        const existing = await this.findById(document.id);
        if (existing) {
            await this.searchProvider.update(document);
        }
        else {
            await this.searchProvider.index(document);
        }
    }
    async delete(id) {
        await this.searchProvider.delete(id.toString());
    }
    async autocomplete(query) {
        return await this.searchProvider.autocomplete(query);
    }
    async getSuggestions(query) {
        return await this.searchProvider.getSuggestions(query);
    }
    async getTrending() {
        return await this.searchProvider.getTrending();
    }
    async search(query, filters, sortBy, sortOrder, limit, offset, includeFacets) {
        return await this.searchProvider.search(query, filters, sortBy, sortOrder, limit, offset, includeFacets);
    }
    async bulkSave(documents) {
        await this.searchProvider.bulkIndex(documents);
    }
    async runInTransaction(callback) {
        // For now, PostgresSearchProvider bulkIndex already handles simple transactions.
        // Full repository-level transaction support would require further infrastructure work.
        return await callback(this);
    }
}
exports.SearchRepository = SearchRepository;
//# sourceMappingURL=SearchRepository.js.map