"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEdgeDeletedEvent = exports.GraphEdgeUpdatedEvent = exports.GraphEdgeCreatedEvent = exports.GraphNodeDeletedEvent = exports.GraphNodeUpdatedEvent = exports.GraphNodeCreatedEvent = void 0;
class GraphNodeCreatedEvent {
    nodeId;
    type;
    constructor(nodeId, type) {
        this.nodeId = nodeId;
        this.type = type;
    }
}
exports.GraphNodeCreatedEvent = GraphNodeCreatedEvent;
class GraphNodeUpdatedEvent {
    nodeId;
    metadata;
    constructor(nodeId, metadata) {
        this.nodeId = nodeId;
        this.metadata = metadata;
    }
}
exports.GraphNodeUpdatedEvent = GraphNodeUpdatedEvent;
class GraphNodeDeletedEvent {
    nodeId;
    constructor(nodeId) {
        this.nodeId = nodeId;
    }
}
exports.GraphNodeDeletedEvent = GraphNodeDeletedEvent;
class GraphEdgeCreatedEvent {
    sourceId;
    targetId;
    type;
    constructor(sourceId, targetId, type) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
    }
}
exports.GraphEdgeCreatedEvent = GraphEdgeCreatedEvent;
class GraphEdgeUpdatedEvent {
    sourceId;
    targetId;
    type;
    properties;
    constructor(sourceId, targetId, type, properties) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
        this.properties = properties;
    }
}
exports.GraphEdgeUpdatedEvent = GraphEdgeUpdatedEvent;
class GraphEdgeDeletedEvent {
    sourceId;
    targetId;
    type;
    constructor(sourceId, targetId, type) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
    }
}
exports.GraphEdgeDeletedEvent = GraphEdgeDeletedEvent;
//# sourceMappingURL=GraphEvents.js.map