import { Pool } from 'pg';
import { PostgresSearchProvider } from '@modules/search/infrastructure/search/PostgresSearchProvider';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('PostgresSearchProvider Integration', () => {
  let pool: Pool;
  let provider: PostgresSearchProvider;

  beforeAll(async () => {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    provider = new PostgresSearchProvider(pool);
    await provider.createIndex('test');
  });

  afterAll(async () => {
    await provider.deleteIndex('test');
    await pool.end();
  });

  it('should rank results based on popularity and freshness', async () => {
    const oldDoc = new SearchDocument(new UniqueEntityId(), 'entity', new UniqueEntityId(), {
      title: 'Match',
      popularity: 1,
      createdAt: new Date(Date.now() - 10000000000), // Very old
    });
    const newDoc = new SearchDocument(new UniqueEntityId(), 'entity', new UniqueEntityId(), {
      title: 'Match',
      popularity: 1,
      createdAt: new Date(), // New
    });
    const popularDoc = new SearchDocument(new UniqueEntityId(), 'entity', new UniqueEntityId(), {
      title: 'Match',
      popularity: 100, // Very popular
      createdAt: new Date(Date.now() - 10000000000), // Very old
    });

    await provider.index(oldDoc);
    await provider.index(newDoc);
    await provider.index(popularDoc);

    const results = await provider.search('Match', undefined, 'relevance', 'desc', 10, 0);

    // The order should be: popularDoc, newDoc, oldDoc
    // (Popularity is a strong factor, then freshness)
    expect(results.documents[0].id.toString()).toBe(popularDoc.id.toString());
    expect(results.documents[1].id.toString()).toBe(newDoc.id.toString());
    expect(results.documents[2].id.toString()).toBe(oldDoc.id.toString());
  });
});
