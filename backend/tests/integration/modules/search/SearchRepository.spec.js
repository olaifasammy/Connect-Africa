"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PostgresSearchProvider_1 = require("@modules/search/infrastructure/search/PostgresSearchProvider");
const SearchRepository_1 = require("@modules/search/infrastructure/repositories/SearchRepository");
const SearchDocument_1 = require("@modules/search/domain/models/SearchDocument");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
describe('SearchRepository Integration', () => {
    let pool;
    let repository;
    let provider;
    beforeAll(async () => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        provider = new PostgresSearchProvider_1.PostgresSearchProvider(pool);
        repository = new SearchRepository_1.SearchRepository(provider);
        await provider.createIndex('test');
    });
    afterAll(async () => {
        await provider.deleteIndex('test');
        await pool.end();
    });
    it('should save and find a document', async () => {
        const id = new UniqueEntityId_1.UniqueEntityId();
        const doc = new SearchDocument_1.SearchDocument(id, 'entity', new UniqueEntityId_1.UniqueEntityId(), { title: 'Test' });
        await repository.save(doc);
        const found = await repository.findById(id);
        expect(found).not.toBeNull();
        expect(found?.id.toString()).toBe(id.toString());
    });
});
//# sourceMappingURL=SearchRepository.spec.js.map