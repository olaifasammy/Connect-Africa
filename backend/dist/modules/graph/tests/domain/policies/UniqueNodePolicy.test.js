"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueNodePolicy_1 = require("../../../../graph/domain/policies/UniqueNodePolicy");
const GraphEntities_1 = require("../../../../graph/domain/entities/GraphEntities");
describe('UniqueNodePolicy', () => {
    it('should return true for unique node', () => {
        const nodes = [new GraphEntities_1.GraphNode('n1', 'type', [], {})];
        const newNode = new GraphEntities_1.GraphNode('n2', 'type', [], {});
        expect(UniqueNodePolicy_1.UniqueNodePolicy.check(nodes, newNode)).toBe(true);
    });
    it('should return false for duplicate node', () => {
        const nodes = [new GraphEntities_1.GraphNode('n1', 'type', [], {})];
        const newNode = new GraphEntities_1.GraphNode('n1', 'type', [], {});
        expect(UniqueNodePolicy_1.UniqueNodePolicy.check(nodes, newNode)).toBe(false);
    });
});
//# sourceMappingURL=UniqueNodePolicy.test.js.map