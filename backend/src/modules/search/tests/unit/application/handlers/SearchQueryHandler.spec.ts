import { SearchQueryHandler } from '@modules/search/application/handlers/SearchQueryHandler';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchQuery } from '@modules/search/application/queries/SearchQuery';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

describe('SearchQueryHandler', () => {
  let handler: SearchQueryHandler;
  let mockRepository: jest.Mocked<ISearchRepository>;
  let mockMetrics: jest.Mocked<IMetricsProvider>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
      bulkSave: jest.fn(),
      autocomplete: jest.fn(),
      getSuggestions: jest.fn(),
      getTrending: jest.fn(),
      runInTransaction: jest.fn(),
    };
    mockMetrics = {
      incrementCounter: jest.fn(),
      observeDuration: jest.fn(),
    } as any;
    handler = new SearchQueryHandler(mockRepository, mockMetrics);
  });

  it('should return search results', async () => {
    const document = new SearchDocument(new UniqueEntityId(), 'entity', new UniqueEntityId(), { title: 'Test' });
    mockRepository.search.mockResolvedValue({ documents: [document] });

    const query = new SearchQuery({ query: 'test' });
    const result = await handler.handle(query);

    expect(result.results).toHaveLength(1);
    expect(result.results[0].title).toBe('Test');
    expect(mockRepository.search).toHaveBeenCalledWith('test', undefined, undefined, undefined, 10, 0, undefined);
  });
});
