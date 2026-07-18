"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateOntologyCommandHandler_1 = require("@modules/ontology/application/handlers/CreateOntologyCommandHandler");
const OntologyService_1 = require("@modules/ontology/application/services/OntologyService");
const PostgresOntologyRepository_1 = require("@modules/ontology/infrastructure/PostgresOntologyRepository");
const PostgresAuditRepository_1 = require("@modules/audit/infrastructure/audit/PostgresAuditRepository");
const UniqueOntologyPolicy_1 = require("@modules/ontology/domain/policies/UniqueOntologyPolicy");
const PostgresProvider_1 = require("@infrastructure/database/PostgresProvider");
describe('CreateOntologyCommandHandler Integration', () => {
    let postgresProvider;
    let ontologyRepository;
    let auditRepository;
    let policy;
    let handler;
    beforeAll(() => {
        postgresProvider = new PostgresProvider_1.PostgresProvider();
        ontologyRepository = new PostgresOntologyRepository_1.PostgresOntologyRepository(postgresProvider);
        // PostgresAuditRepository expects a pg Pool
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        auditRepository = new PostgresAuditRepository_1.PostgresAuditRepository(pool);
        policy = new UniqueOntologyPolicy_1.UniqueOntologyPolicy(ontologyRepository);
        const service = new OntologyService_1.OntologyService(ontologyRepository, policy, auditRepository, { publish: jest.fn() }, // EventBus
        { incrementCounter: jest.fn(), observeDuration: jest.fn() } // Metrics
        );
        handler = new CreateOntologyCommandHandler_1.CreateOntologyCommandHandler(service);
    });
    afterEach(async () => {
        // Clean up inserted records to avoid test pollution
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        await pool.query('DELETE FROM ontologies WHERE name LIKE $1', ['Integration Test%']);
        await pool.query('DELETE FROM audit_logs WHERE action = $1', ['CREATE_ONTOLOGY']);
    });
    afterAll(async () => {
        // Close DB pool connections
        await PostgresProvider_1.PostgresProvider.getPool().end();
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
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        const auditRes = await pool.query('SELECT * FROM audit_logs WHERE user_id = $1 AND action = $2', ['test-user', 'CREATE_ONTOLOGY']);
        expect(auditRes.rowCount).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=CreateOntologyCommandHandler.test.js.map