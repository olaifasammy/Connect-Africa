"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TraversalService_1 = require("../../../graph/domain/services/TraversalService");
const GraphEntities_1 = require("../../../graph/domain/entities/GraphEntities");
describe('TraversalService', () => {
    let traversalService;
    let mockRepo;
    beforeEach(() => {
        mockRepo = {
            getNeighbors: jest.fn(),
            findShortestPath: jest.fn(),
            saveNode: jest.fn(),
            updateNode: jest.fn(),
            deleteNode: jest.fn(),
            saveEdge: jest.fn(),
            updateEdge: jest.fn(),
            deleteEdge: jest.fn(),
            existsEdge: jest.fn(),
            depthTraversal: jest.fn(),
            breadthTraversal: jest.fn(),
            findByLabel: jest.fn(),
            findByOntologyType: jest.fn(),
            findEdgesByType: jest.fn(),
            filterByMetadata: jest.fn(),
            findById: jest.fn(),
            runInTransaction: jest.fn(),
        };
        traversalService = new TraversalService_1.TraversalService(mockRepo);
    });
    it('should return contextual neighbors', async () => {
        const mockNodes = [new GraphEntities_1.GraphNode('n1', 'type1', [], {})];
        mockRepo.getNeighbors.mockResolvedValue({ nodes: mockNodes, edges: [] });
        const result = await traversalService.getContextualNeighbors('sourceId');
        expect(result).toBe(mockNodes);
        expect(mockRepo.getNeighbors).toHaveBeenCalledWith('sourceId');
    });
});
//# sourceMappingURL=TraversalService.test.js.map