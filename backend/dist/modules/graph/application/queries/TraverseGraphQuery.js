"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraverseGraphQuery = void 0;
class TraverseGraphQuery {
    entityId;
    maxDepth;
    mode;
    constructor(entityId, maxDepth, mode = 'depth') {
        this.entityId = entityId;
        this.maxDepth = maxDepth;
        this.mode = mode;
    }
}
exports.TraverseGraphQuery = TraverseGraphQuery;
//# sourceMappingURL=TraverseGraphQuery.js.map