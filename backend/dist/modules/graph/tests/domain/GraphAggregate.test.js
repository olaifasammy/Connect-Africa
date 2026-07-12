"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraphAggregate_1 = require("../../../graph/domain/entities/GraphAggregate");
const GraphEntities_1 = require("../../../graph/domain/entities/GraphEntities");
describe('GraphAggregate', () => {
    it('should add a node successfully', () => {
        const aggregate = new GraphAggregate_1.GraphAggregate();
        const node = new GraphEntities_1.GraphNode('n1', 'type1', ['label1'], {});
        aggregate.addNode(node);
        expect(aggregate.getDomainEvents()).toContainEqual(expect.objectContaining({ nodeId: 'n1' }));
    });
    it('should throw error when adding duplicate node', () => {
        const aggregate = new GraphAggregate_1.GraphAggregate();
        const node = new GraphEntities_1.GraphNode('n1', 'type1', ['label1'], {});
        aggregate.addNode(node);
        expect(() => aggregate.addNode(node)).toThrow('Node already exists in aggregate');
    });
    it('should add an edge successfully when nodes exist', () => {
        const node1 = new GraphEntities_1.GraphNode('n1', 'type1', [], {});
        const node2 = new GraphEntities_1.GraphNode('n2', 'type2', [], {});
        const aggregate = new GraphAggregate_1.GraphAggregate([node1, node2], []);
        const edge = new GraphEntities_1.GraphEdge('n1', 'n2', 'relType', {});
        aggregate.addEdge(edge);
        expect(aggregate.getDomainEvents()).toContainEqual(expect.objectContaining({ sourceId: 'n1', targetId: 'n2' }));
    });
    it('should throw error when adding edge to non-existent node', () => {
        const aggregate = new GraphAggregate_1.GraphAggregate([], []);
        const edge = new GraphEntities_1.GraphEdge('n1', 'n2', 'relType', {});
        expect(() => aggregate.addEdge(edge)).toThrow('Source or target node does not exist in aggregate');
    });
});
//# sourceMappingURL=GraphAggregate.test.js.map