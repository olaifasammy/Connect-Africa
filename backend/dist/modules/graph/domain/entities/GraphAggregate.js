"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphAggregate = void 0;
const GraphEvents_1 = require("../events/GraphEvents");
class GraphAggregate {
    nodes;
    edges;
    _domainEvents = [];
    constructor(nodes = [], edges = []) {
        this.nodes = nodes;
        this.edges = edges;
    }
    addNode(node) {
        if (this.nodes.some(n => n.entityId === node.entityId)) {
            throw new Error('Node already exists in aggregate');
        }
        this.nodes.push(node);
        this._domainEvents.push(new GraphEvents_1.GraphNodeCreatedEvent(node.entityId, node.type));
    }
    addEdge(edge) {
        if (!this.nodes.some(n => n.entityId === edge.sourceEntityId) ||
            !this.nodes.some(n => n.entityId === edge.targetEntityId)) {
            throw new Error('Source or target node does not exist in aggregate');
        }
        if (this.edges.some(e => e.sourceEntityId === edge.sourceEntityId &&
            e.targetEntityId === edge.targetEntityId &&
            e.relationshipType === edge.relationshipType)) {
            throw new Error('Edge already exists in aggregate');
        }
        this.edges.push(edge);
        this._domainEvents.push(new GraphEvents_1.GraphEdgeCreatedEvent(edge.sourceEntityId, edge.targetEntityId, edge.relationshipType));
    }
    updateNode(entityId, metadata) {
        const node = this.nodes.find(n => n.entityId === entityId);
        if (!node) {
            throw new Error('Node not found');
        }
        node.updateMetadata(metadata);
        this._domainEvents.push(new GraphEvents_1.GraphNodeUpdatedEvent(entityId, metadata));
    }
    getDomainEvents() {
        return [...this._domainEvents];
    }
    clearDomainEvents() {
        this._domainEvents = [];
    }
}
exports.GraphAggregate = GraphAggregate;
//# sourceMappingURL=GraphAggregate.js.map