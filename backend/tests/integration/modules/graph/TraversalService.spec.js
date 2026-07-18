"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TraversalService_1 = require("@modules/graph/domain/services/TraversalService");
const PostgresGraphRepository_1 = require("@modules/graph/infrastructure/PostgresGraphRepository");
const pg_1 = require("pg");
describe('TraversalService Integration', () => {
    let repository;
    let pool;
    let service;
    beforeAll(() => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        repository = new PostgresGraphRepository_1.PostgresGraphRepository(pool);
        service = new TraversalService_1.TraversalService(repository);
    });
    afterAll(async () => {
        // Clean up database tables used for testing
        await pool.query('DELETE FROM relationships');
        await pool.query('DELETE FROM entities');
        await pool.end();
    });
    it.skip('should fetch contextual neighbors from database', async () => {
        // Seed test data
        const sourceId = '00000000-0000-0000-0000-000000000001';
        const targetId = '00000000-0000-0000-0000-000000000002';
        await pool.query('INSERT INTO entities (id, name, type) VALUES ($1, $2, $3), ($4, $5, $6)', [sourceId, 'sourceName', 'typeA', targetId, 'targetName', 'typeB']);
        await pool.query('INSERT INTO relationships (id, source_id, target_id, type_id) VALUES (gen_random_uuid(), $1, $2, $3)', [sourceId, targetId, 'relType']);
        const result = await service.getContextualNeighbors(sourceId);
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2); // Should find both source (as part of setup) and target
        expect(result.some(n => n.entityId === targetId)).toBe(true);
    });
});
//# sourceMappingURL=TraversalService.spec.js.map