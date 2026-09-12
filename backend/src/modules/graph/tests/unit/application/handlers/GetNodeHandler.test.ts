import { GetNodeHandler } from '../../../../application/handlers/GetNodeHandler';
import { GetNodeQuery } from '../../../../application/queries/GetNodeQuery';
import { IGraphRepository } from '../../../../domain/repositories/IGraphRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('GetNodeHandler', () => {
  it('should retrieve a node by entity id', async () => {
    const mockRepo: jest.Mocked<IGraphRepository> = {
      findById: jest.fn().mockResolvedValue({ id: 'node-1', type: 'entity' }),
      saveNode: jest.fn(),
      deleteNode: jest.fn(),
      findPath: jest.fn(),
      shortestPath: jest.fn(),
      traverse: jest.fn(),
      search: jest.fn()
    } as any;

    const handler = new GetNodeHandler(mockRepo);
    const query = new GetNodeQuery('node-1');
    const result = await handler.handle(query);

    expect(result).toEqual({ id: 'node-1', type: 'entity' });
    expect(mockRepo.findById).toHaveBeenCalled();
  });
});
