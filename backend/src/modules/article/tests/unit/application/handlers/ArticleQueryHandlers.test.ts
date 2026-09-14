import { GetArticleHandler, GetArticleBySlugHandler, SearchArticlesHandler, GetLatestArticlesHandler } from '../../../../application/handlers/ArticleQueryHandlers';
import { GetArticleQuery, GetArticleBySlugQuery, SearchArticlesQuery, GetLatestArticlesQuery } from '../../../../application/queries/ArticleQueries';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('ArticleQueryHandlers', () => {
  it('GetArticleHandler should fetch article by id', async () => {
    const mockRepo = { findById: jest.fn().mockResolvedValue({ id: '1' }) };
    const handler = new GetArticleHandler(mockRepo as any);
    const id = new UniqueEntityId();
    const result = await handler.handle(new GetArticleQuery(id));
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id: '1' });
  });

  it('GetArticleBySlugHandler should fetch article by slug', async () => {
    const mockRepo = { findBySlug: jest.fn().mockResolvedValue({ id: '2' }) };
    const handler = new GetArticleBySlugHandler(mockRepo as any);
    const result = await handler.handle(new GetArticleBySlugQuery('test-slug'));
    expect(mockRepo.findBySlug).toHaveBeenCalledWith('test-slug');
    expect(result).toEqual({ id: '2' });
  });

  it('SearchArticlesHandler should search articles', async () => {
    const mockRepo = { search: jest.fn().mockResolvedValue([{ id: '3' }]) };
    const handler = new SearchArticlesHandler(mockRepo as any);
    const result = await handler.handle(new SearchArticlesQuery('query'));
    expect(mockRepo.search).toHaveBeenCalledWith('query');
    expect(result).toEqual([{ id: '3' }]);
  });

  it('GetLatestArticlesHandler should fetch latest articles', async () => {
    const mockRepo = { findLatest: jest.fn().mockResolvedValue([{ id: '4' }]) };
    const handler = new GetLatestArticlesHandler(mockRepo as any);
    const result = await handler.handle(new GetLatestArticlesQuery(10));
    expect(mockRepo.findLatest).toHaveBeenCalledWith(10, 0);
    expect(result).toEqual([{ id: '4' }]);
  });
});
