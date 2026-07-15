import { Pool } from 'pg';
import { PostgresSearchProvider } from '@modules/search/infrastructure/search/PostgresSearchProvider';
import { SearchRepository } from '@modules/search/infrastructure/repositories/SearchRepository';
import { SearchQueryHandler } from '@modules/search/application/handlers/SearchQueryHandler';
import { SearchQuery } from '@modules/search/application/queries/SearchQuery';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('Search API Integration', () => {
  let pool: Pool;
  let handler: SearchQueryHandler;
  let provider: PostgresSearchProvider;

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    provider = new PostgresSearchProvider(pool);
    const repository = new SearchRepository(provider);
    const mockMetrics = { incrementCounter: jest.fn(), observeDuration: jest.fn() } as any;
    handler = new SearchQueryHandler(repository, mockMetrics);
    await provider.createIndex('test');
  });

  afterAll(async () => {
    await provider.deleteIndex('test');
    await pool.end();
  });

  it('should search for documents', async () => {
    const doc = new SearchDocument(new UniqueEntityId(), 'article', new UniqueEntityId(), { title: 'Integration Test' });
    await provider.index(doc);

    const query = new SearchQuery({ query: 'Integration' });
    const result = await handler.handle(query);

    expect(result.results).toHaveLength(1);
    expect(result.results[0].title).toBe('Integration Test');
  });
});
