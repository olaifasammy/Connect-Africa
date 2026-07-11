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
    async search(query) {
        return await this.searchProvider.search(query);
    }
    async bulkSave(documents) {
        await this.searchProvider.bulkIndex(documents);
    }
}
exports.SearchRepository = SearchRepository;
//# sourceMappingURL=SearchRepository.js.map