import { ArticleController } from '../../../interfaces/controllers/ArticleController';
import { CreateArticleCommand } from '../../../application/commands/CreateArticleCommand';

describe('ArticleController', () => {
  it('should create article successfully via controller', async () => {
    const mockCreateHandler = { handle: jest.fn().mockResolvedValue('article-id-123') };
    const mockMetrics = { incrementCounter: jest.fn() };

    const controller = new ArticleController(
      mockCreateHandler as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      mockMetrics as any
    );

    const req = {
      user: { id: 'user-1' },
      body: { title: 'Test', summary: 'Summary', content: 'Content' }
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    await controller.create(req, res);

    expect(mockCreateHandler.handle).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'article-id-123' });
    expect(mockMetrics.incrementCounter).toHaveBeenCalledWith('article_operations_total', { action: 'create' });
  });

  it('should return 401 if unauthenticated on create', async () => {
    const controller = new ArticleController(
      {} as any, {} as any, {} as any, {} as any, {} as any,
      {} as any, {} as any, {} as any, {} as any, {} as any,
      {} as any, {} as any, {} as any, {} as any, {} as any,
      {} as any, {} as any, {} as any, {} as any, {} as any,
      {} as any, {} as any, {} as any, { incrementCounter: jest.fn() } as any
    );

    const req = { user: undefined, body: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    await controller.create(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
