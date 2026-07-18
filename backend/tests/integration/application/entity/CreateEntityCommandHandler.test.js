"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateEntityCommandHandler_1 = require("@modules/entity/application/handlers/CreateEntityCommandHandler");
const PostgresEntityRepository_1 = require("@modules/entity/infrastructure/PostgresEntityRepository");
const PostgresAuditRepository_1 = require("@modules/audit/infrastructure/audit/PostgresAuditRepository");
const PostgresProvider_1 = require("@shared/infrastructure/database/PostgresProvider");
describe('CreateEntityCommandHandler Integration', () => {
    let entityRepository;
    let auditRepository;
    let handler;
    beforeAll(() => {
        const postgresProvider = new PostgresProvider_1.PostgresProvider();
        entityRepository = new PostgresEntityRepository_1.PostgresEntityRepository(postgresProvider.pool);
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        auditRepository = new PostgresAuditRepository_1.PostgresAuditRepository(pool);
        handler = new CreateEntityCommandHandler_1.CreateEntityCommandHandler(entityRepository, auditRepository, { publish: jest.fn() });
    });
    afterEach(async () => {
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        await pool.query('DELETE FROM entities WHERE name LIKE $1', ['Integration Test%']);
        await pool.query('DELETE FROM entities WHERE name = $1', ['Repo Test']);
        await pool.query('DELETE FROM audit_logs');
    });
    afterAll(async () => {
        await PostgresProvider_1.PostgresProvider.getPool().end();
    });
    it('should save entity to the database and create audit log', async () => {
        const command = {
            dto: {
                name: 'Integration Test Entity Live',
                type: 'Person',
                description: 'Test Description Live',
            },
            userId: '00000000-0000-0000-0000-000000000000'
        };
        await handler.handle(command);
        // Verify persistence using the real repository
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        const dbRes = await pool.query('SELECT * FROM entities WHERE name = $1', [command.dto.name]);
        expect(dbRes.rowCount).toBe(1);
        expect(dbRes.rows[0].name).toBe(command.dto.name);
        // Verify audit log creation
        const auditRes = await pool.query('SELECT * FROM audit_entries WHERE action = $1', ['CREATE_ENTITY']);
        expect(auditRes.rowCount).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=CreateEntityCommandHandler.test.js.map