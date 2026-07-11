"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEdge = exports.GraphNode = void 0;
const GraphErrors_1 = require("../errors/GraphErrors");
class GraphNode {
    entityId;
    type;
    labels;
    metadata;
    sources;
    constructor(entityId, type, labels, metadata, sources = []) {
        this.entityId = entityId;
        this.type = type;
        this.labels = labels;
        this.metadata = metadata;
        this.sources = sources;
        this.validate();
    }
    updateMetadata(newMetadata) {
        Object.assign(this.metadata, newMetadata);
    }
    addSource(source) {
        this.sources.push(source);
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
    properties;
    sources;
    constructor(sourceEntityId, targetEntityId, relationshipType, properties, sources = []) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipType = relationshipType;
        this.properties = properties;
        this.sources = sources;
        this.validate();
    }
    addSource(source) {
        this.sources.push(source);
    }
    validate() {
        if (!this.sourceEntityId || !this.targetEntityId || !this.relationshipType) {
            throw new GraphErrors_1.GraphValidationError('Source, target, and relationship type are required');
        }
    }
}
exports.GraphEdge = GraphEdge;
//# sourceMappingURL=GraphEntities.js.map