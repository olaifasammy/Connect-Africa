import { Pool } from 'pg';
import { PostgresSearchProvider } from '@modules/search/infrastructure/search/PostgresSearchProvider';
import { SearchRepository } from '@modules/search/infrastructure/repositories/SearchRepository';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('SearchRepository Integration', () => {
  let pool: Pool;
  let repository: SearchRepository;
  let provider: PostgresSearchProvider;

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    provider = new PostgresSearchProvider(pool);
    repository = new SearchRepository(provider);
    await provider.createIndex('test');
  });

  afterAll(async () => {
    await provider.deleteIndex('test');
    await pool.end();
  });

  it('should save and find a document', async () => {
    const id = new UniqueEntityId();
    const doc = new SearchDocument(id, 'entity', new UniqueEntityId(), { title: 'Test' });
    await repository.save(doc);
    const found = await repository.findById(id);
    expect(found).not.toBeNull();
    expect(found?.id.toString()).toBe(id.toString());
  });
});
