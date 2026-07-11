import { Pool } from 'pg';
import { PostgresSourceRepository } from '@modules/source/infrastructure/postgres/PostgresSourceRepository';
import { Source } from '@modules/source/domain/entities/Source';
import { SourceId, SourceType, Provenance } from '@modules/source/domain/value-objects/SourceValueObjects';

describe('PostgresSourceRepository', () => {
  let pool: Pool;
  let repository: PostgresSourceRepository;

  beforeAll(async () => {
    // Note: Assuming test database setup exists
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    repository = new PostgresSourceRepository(pool);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sources (
          id UUID PRIMARY KEY,
          title TEXT NOT NULL,
          type TEXT NOT NULL,
          author TEXT NOT NULL,
          published_at TIMESTAMP NOT NULL,
          url TEXT,
          publisher TEXT,
          created_at TIMESTAMP NOT NULL
      );
    `);
  });

  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS sources');
    await pool.end();
  });

  it('should save and find a source', async () => {
    const id = new SourceId();
    const source = Source.create({
      title: 'Integration Test Source',
      type: SourceType.WEB,
      provenance: new Provenance('Author', new Date()),
      createdAt: new Date(),
    }, id);
    
    await repository.save(source);
    const found = await repository.findById(id);
    expect(found?.title).toBe('Integration Test Source');
    expect(found?.id.equals(id)).toBe(true);
  });
});
