"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexingService = void 0;
class SearchIndexingService {
    postgresProvider;
    constructor(postgresProvider) {
        this.postgresProvider = postgresProvider;
    }
    async index(mediaId, metadata, tags) {
        await this.postgresProvider.query('UPDATE media SET metadata = $2 WHERE id = $1', [mediaId.toString(), JSON.stringify({ metadata, tags })]);
    }
}
exports.SearchIndexingService = SearchIndexingService;
//# sourceMappingURL=SearchIndexingService.js.map