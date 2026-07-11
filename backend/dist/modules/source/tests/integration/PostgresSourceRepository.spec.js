"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PostgresSourceRepository_1 = require("../../../source/infrastructure/postgres/PostgresSourceRepository");
const Source_1 = require("../../../source/domain/entities/Source");
const SourceValueObjects_1 = require("../../../source/domain/value-objects/SourceValueObjects");
describe('PostgresSourceRepository', () => {
    let pool;
    let repository;
    beforeAll(async () => {
        // Note: Assuming test database setup exists
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        repository = new PostgresSourceRepository_1.PostgresSourceRepository(pool);
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
        const id = new SourceValueObjects_1.SourceId();
        const source = Source_1.Source.create({
            title: 'Integration Test Source',
            type: SourceValueObjects_1.SourceType.WEB,
            provenance: new SourceValueObjects_1.Provenance('Author', new Date()),
            createdAt: new Date(),
        }, id);
        await repository.save(source);
        const found = await repository.findById(id);
        expect(found?.title).toBe('Integration Test Source');
        expect(found?.id.equals(id)).toBe(true);
    });
});
//# sourceMappingURL=PostgresSourceRepository.spec.js.map