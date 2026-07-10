"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalService = void 0;
class TraversalService {
    graphRepository;
    constructor(graphRepository) {
        this.graphRepository = graphRepository;
    }
    async getContextualNeighbors(entityId) {
        const { nodes } = await this.graphRepository.getNeighbors(entityId);
        return nodes;
    }
}
exports.TraversalService = TraversalService;
//# sourceMappingURL=TraversalService.js.map