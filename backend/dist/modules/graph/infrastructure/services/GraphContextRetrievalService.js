"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphContextRetrievalService = void 0;
class GraphContextRetrievalService {
    graphRepository;
    constructor(graphRepository) {
        this.graphRepository = graphRepository;
    }
    async getContext(entityId) {
        // Implementation to retrieve graph context for a given entity
        return await this.graphRepository.getNeighbors(entityId);
    }
}
exports.GraphContextRetrievalService = GraphContextRetrievalService;
//# sourceMappingURL=GraphContextRetrievalService.js.map