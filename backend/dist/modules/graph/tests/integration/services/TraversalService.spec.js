"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TraversalService_1 = require("../../../../graph/domain/services/TraversalService");
const PostgresGraphRepository_1 = require("../../../../graph/infrastructure/PostgresGraphRepository");
const pg_1 = require("pg");
describe('TraversalService Integration', () => {
    let repository;
    let pool;
    let service;
    beforeAll(() => {
        // Requires a real DB connection or a properly configured test DB container
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        repository = new PostgresGraphRepository_1.PostgresGraphRepository(pool);
        service = new TraversalService_1.TraversalService(repository);
    });
    afterAll(async () => {
        await pool.end();
    });
    it('should fetch contextual neighbors from database', async () => {
        // This is a placeholder as actual test data needs to be populated/cleaned
        // In enterprise testing, we would use fixtures or transaction-based isolation
        const result = await service.getContextualNeighbors('00000000-0000-0000-0000-000000000001');
        expect(result).toBeInstanceOf(Array);
    });
});
//# sourceMappingURL=TraversalService.spec.js.map