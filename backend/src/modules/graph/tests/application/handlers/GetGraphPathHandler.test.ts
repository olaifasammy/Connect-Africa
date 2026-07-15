import { GetGraphPathHandler } from '@modules/graph/application/handlers/GetGraphPathHandler';
import { IGraphRepository } from '@modules/graph/domain/repositories/IGraphRepository';
import { GetGraphPathQuery } from '@modules/graph/application/queries/GetGraphPathQuery';
import { GraphNode } from '@modules/graph/domain/entities/GraphEntities';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

jest.mock('@infrastructure/logging/AuditLogger');

describe('GetGraphPathHandler', () => {
  let handler: GetGraphPathHandler;
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
    handler = new GetGraphPathHandler(mockRepo);
    jest.spyOn(AuditLogger, 'log').mockImplementation(() => {});
  });

  it('should return shortest path and log success', async () => {
    const mockNodes = [new GraphNode('id1', 'type1', ['label1'], {})];
    mockRepo.findShortestPath.mockResolvedValue(mockNodes);

    const result = await handler.handle(new GetGraphPathQuery('id1', 'id2'), 'user1', '127.0.0.1');

    expect(result).toBe(mockNodes);
    expect(AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'SUCCESS' }));
  });

  it('should throw error and log failure', async () => {
    mockRepo.findShortestPath.mockRejectedValue(new Error('DB Error'));

    await expect(handler.handle(new GetGraphPathQuery('id1', 'id2'), 'user1', '127.0.0.1')).rejects.toThrow('DB Error');
    expect(AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'FAILURE' }));
  });
});
