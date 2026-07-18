import { CreateEntityCommandHandler } from '@modules/entity/application/handlers/CreateEntityCommandHandler';
import { PostgresEntityRepository } from '@modules/entity/infrastructure/PostgresEntityRepository';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Pool } from 'pg';

describe('CreateEntityCommandHandler Integration', () => {
  let entityRepository: PostgresEntityRepository;
  let auditRepository: PostgresAuditRepository;
  let handler: CreateEntityCommandHandler;

  beforeAll(() => {
    const postgresProvider = new PostgresProvider();
    entityRepository = new PostgresEntityRepository(postgresProvider.pool);
    
    const pool = PostgresProvider.getPool();
    auditRepository = new PostgresAuditRepository(pool);
    
    handler = new CreateEntityCommandHandler(entityRepository, auditRepository, { publish: jest.fn() } as any);
  });

  afterEach(async () => {
    const pool = PostgresProvider.getPool();
    await pool.query('DELETE FROM entities WHERE name LIKE $1', ['Integration Test%']);
    await pool.query('DELETE FROM entities WHERE name = $1', ['Repo Test']);
    await pool.query('DELETE FROM audit_logs');
  });

  afterAll(async () => {
    await PostgresProvider.getPool().end();
  });

  it('should save entity to the database and create audit log', async () => {
    const command = {
      dto: {
        name: 'Integration Test Entity Live',
        type: 'Person',
        description: 'Test Description Live',
      },
      userId: '00000000-0000-0000-0000-000000000000'
    } as any;

    await handler.handle(command);

    // Verify persistence using the real repository
    const pool = PostgresProvider.getPool();
    const dbRes = await pool.query('SELECT * FROM entities WHERE name = $1', [command.dto.name]);
    expect(dbRes.rowCount).toBe(1);
    expect(dbRes.rows[0].name).toBe(command.dto.name);

    // Verify audit log creation
    const auditRes = await pool.query('SELECT * FROM audit_entries WHERE action = $1', ['CREATE_ENTITY']);
    expect(auditRes.rowCount).toBeGreaterThan(0);
  });
});
