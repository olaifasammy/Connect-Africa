import { TraversalService } from '@modules/graph/domain/services/TraversalService';
import { IGraphRepository } from '@modules/graph/domain/repositories/IGraphRepository';
import { GraphNode } from '@modules/graph/domain/entities/GraphEntities';

describe('TraversalService', () => {
  let traversalService: TraversalService;
  let mockRepo: jest.Mocked<IGraphRepository>;

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
    } as jest.Mocked<IGraphRepository>;
    
    traversalService = new TraversalService(mockRepo);
  });

  it('should return contextual neighbors', async () => {
    const mockNodes = [new GraphNode('n1', 'type1', [], {})];
    mockRepo.getNeighbors.mockResolvedValue({ nodes: mockNodes, edges: [] });

    const result = await traversalService.getContextualNeighbors('sourceId');

    expect(result).toBe(mockNodes);
    expect(mockRepo.getNeighbors).toHaveBeenCalledWith('sourceId');
  });
});
