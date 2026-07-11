"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSourcesHandler = exports.GetSourceHandler = void 0;
class GetSourceHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return await this.repository.findById(query.sourceId);
    }
}
exports.GetSourceHandler = GetSourceHandler;
class SearchSourcesHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return []; // Implementation requires repo method
    }
}
exports.SearchSourcesHandler = SearchSourcesHandler;
//# sourceMappingURL=SourceQueryHandlers.js.map