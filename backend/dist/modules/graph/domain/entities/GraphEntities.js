"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEdge = exports.GraphNode = void 0;
const GraphErrors_1 = require("../errors/GraphErrors");
class GraphNode {
    entityId;
    type;
    metadata;
    constructor(entityId, type, metadata) {
        this.entityId = entityId;
        this.type = type;
        this.metadata = metadata;
        this.validate();
    }
    validate() {
        if (!this.entityId || this.entityId.length === 0) {
            throw new GraphErrors_1.GraphValidationError('Entity ID is required');
        }
        if (!this.type || this.type.length === 0) {
            throw new GraphErrors_1.GraphValidationError('Entity type is required');
        }
    }
}
exports.GraphNode = GraphNode;
class GraphEdge {
    sourceEntityId;
    targetEntityId;
    relationshipType;
    constructor(sourceEntityId, targetEntityId, relationshipType) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipType = relationshipType;
        this.validate();
    }
    validate() {
        if (!this.sourceEntityId || !this.targetEntityId || !this.relationshipType) {
            throw new GraphErrors_1.GraphValidationError('Source, target, and relationship type are required');
        }
    }
}
exports.GraphEdge = GraphEdge;
//# sourceMappingURL=GraphEntities.js.map