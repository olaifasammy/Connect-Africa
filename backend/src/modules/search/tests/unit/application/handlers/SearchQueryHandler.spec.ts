import { SearchQueryHandler } from '@modules/search/application/handlers/SearchQueryHandler';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchQuery } from '@modules/search/application/queries/SearchQuery';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('SearchQueryHandler', () => {
  let handler: SearchQueryHandler;
  let mockRepository: jest.Mocked<ISearchRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
      bulkSave: jest.fn(),
      autocomplete: jest.fn(),
    };
    handler = new SearchQueryHandler(mockRepository);
  });

  it('should return search results', async () => {
    const document = new SearchDocument(new UniqueEntityId(), 'entity', new UniqueEntityId(), { title: 'Test' });
    mockRepository.search.mockResolvedValue([document]);

    const query = new SearchQuery({ query: 'test' });
    const result = await handler.handle(query);

    expect(result.results).toHaveLength(1);
    expect(result.results[0].title).toBe('Test');
    expect(mockRepository.search).toHaveBeenCalledWith('test');
  });
});
