"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchGraphHandler = void 0;
class SearchGraphHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        if (query.label) {
            return await this.repository.findByLabel(query.label, query.limit, query.offset);
        }
        return []; // Simplified for now
    }
}
exports.SearchGraphHandler = SearchGraphHandler;
//# sourceMappingURL=SearchGraphHandler.js.map