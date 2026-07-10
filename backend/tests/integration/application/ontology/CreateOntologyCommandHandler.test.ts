import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { OntologyService } from '@modules/ontology/application/services/OntologyService';
import { PostgresOntologyRepository } from '@modules/ontology/infrastructure/PostgresOntologyRepository';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { PostgresProvider } from '@infrastructure/database/PostgresProvider';
import { Pool } from 'pg';

describe('CreateOntologyCommandHandler Integration', () => {
  let postgresProvider: PostgresProvider;
  let ontologyRepository: PostgresOntologyRepository;
  let auditRepository: PostgresAuditRepository;
  let policy: UniqueOntologyPolicy;
  let handler: CreateOntologyCommandHandler;

  beforeAll(() => {
    postgresProvider = new PostgresProvider();
    ontologyRepository = new PostgresOntologyRepository(postgresProvider);
    
    // PostgresAuditRepository expects a pg Pool
    const pool = PostgresProvider.getPool();
    auditRepository = new PostgresAuditRepository(pool);
    
    policy = new UniqueOntologyPolicy(ontologyRepository);
    
    const service = new OntologyService(
      ontologyRepository,
      policy,
      auditRepository,
      { publish: jest.fn() } as any, // EventBus
      { incrementCounter: jest.fn(), observeDuration: jest.fn() } as any // Metrics
    );
    handler = new CreateOntologyCommandHandler(service);
  });

  afterEach(async () => {
    // Clean up inserted records to avoid test pollution
    const pool = PostgresProvider.getPool();
    await pool.query('DELETE FROM ontologies WHERE name LIKE $1', ['Integration Test%']);
    await pool.query('DELETE FROM audit_logs WHERE action = $1', ['CREATE_ONTOLOGY']);
  });

  afterAll(async () => {
    // Close DB pool connections
    await PostgresProvider.getPool().end();
  });

  it('should save ontology to the database and create audit log', async () => {
    const command = {
      name: 'Integration Test Ontology Live',
      description: 'Test Description Live',
      version: 1,
    };

    const result = await handler.handle(command, 'test-user', '127.0.0.1');

    expect(result.name).toBe(command.name);
    
    // Verify persistence using the real repository
    const savedOntology = await ontologyRepository.findByName(command.name);
    expect(savedOntology).not.toBeNull();
    expect(savedOntology?.name).toBe(command.name);

    // Verify audit log creation
    const pool = PostgresProvider.getPool();
    const auditRes = await pool.query('SELECT * FROM audit_logs WHERE user_id = $1 AND action = $2', ['test-user', 'CREATE_ONTOLOGY']);
    expect(auditRes.rowCount).toBeGreaterThan(0);
  });
});
