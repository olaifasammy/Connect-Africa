import { CreateArticleHandler } from '../../../../application/handlers/CreateArticleHandler';
import { CreateArticleCommand } from '../../../../application/commands/CreateArticleCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('CreateArticleHandler', () => {
  it('should successfully handle create article command and save via UoW', async () => {
    const mockRepo = { save: jest.fn().mockResolvedValue(undefined) };
    const mockRevisionRepo = { save: jest.fn().mockResolvedValue(undefined) };
    const mockUoW = { execute: jest.fn().mockImplementation(async (fn) => await fn()) };
    const mockEventBus = { publish: jest.fn().mockResolvedValue(undefined) };

    const handler = new CreateArticleHandler(
      mockRepo as any,
      mockRevisionRepo as any,
      mockUoW as any,
      mockEventBus as any
    );

    const authorId = new UniqueEntityId();
    const command = new CreateArticleCommand(
      'Enterprise Architecture',
      'Summary of architecture',
      'Detailed content body',
      authorId,
      'en'
    );

    const articleId = await handler.handle(command);

    expect(articleId).toBeDefined();
    expect(mockUoW.execute).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockRevisionRepo.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
  });
});
