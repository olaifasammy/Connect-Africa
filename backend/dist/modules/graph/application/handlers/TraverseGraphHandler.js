"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraverseGraphHandler = void 0;
class TraverseGraphHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        if (query.mode === 'depth') {
            return await this.repository.depthTraversal(query.entityId, query.maxDepth);
        }
        return await this.repository.breadthTraversal(query.entityId, query.maxDepth);
    }
}
exports.TraverseGraphHandler = TraverseGraphHandler;
//# sourceMappingURL=TraverseGraphHandler.js.map