import { TraversalService } from '@modules/graph/domain/services/TraversalService';
import { PostgresGraphRepository } from '@modules/graph/infrastructure/PostgresGraphRepository';
import { Pool } from 'pg';
import { GraphNode } from '@modules/graph/domain/entities/GraphEntities';

describe('TraversalService Integration', () => {
  let repository: PostgresGraphRepository;
  let pool: Pool;
  let service: TraversalService;

  beforeAll(() => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    repository = new PostgresGraphRepository(pool);
    service = new TraversalService(repository);
  });

  afterAll(async () => {
    // Clean up database tables used for testing
    await pool.query('DELETE FROM relationships');
    await pool.query('DELETE FROM entities');
    await pool.end();
  });

  it('should fetch contextual neighbors from database', async () => {
    // Seed test data
    const sourceId = '00000000-0000-0000-0000-000000000001';
    const targetId = '00000000-0000-0000-0000-000000000002';
    await pool.query('INSERT INTO entities (id, type) VALUES ($1, $2), ($3, $4)', [sourceId, 'typeA', targetId, 'typeB']);
    await pool.query('INSERT INTO relationships (id, source_id, target_id, type_id) VALUES (gen_random_uuid(), $1, $2, $3)', [sourceId, targetId, 'relType']);

    const result = await service.getContextualNeighbors(sourceId);
    
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2); // Should find both source (as part of setup) and target
    expect(result.some(n => n.entityId === targetId)).toBe(true);
  });
});
