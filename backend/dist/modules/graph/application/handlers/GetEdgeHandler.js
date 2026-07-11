"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEdgeHandler = void 0;
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
class GetEdgeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        const exists = await this.repository.existsEdge(query.sourceEntityId, query.targetEntityId, query.relationshipType);
        if (!exists)
            return null;
        return new GraphEntities_1.GraphEdge(query.sourceEntityId, query.targetEntityId, query.relationshipType, {});
    }
}
exports.GetEdgeHandler = GetEdgeHandler;
//# sourceMappingURL=GetEdgeHandler.js.map