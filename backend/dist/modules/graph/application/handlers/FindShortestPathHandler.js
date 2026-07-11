"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindShortestPathHandler = void 0;
class FindShortestPathHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return await this.repository.findShortestPath(query.startEntityId, query.endEntityId);
    }
}
exports.FindShortestPathHandler = FindShortestPathHandler;
//# sourceMappingURL=FindShortestPathHandler.js.map