"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PostgresSearchProvider_1 = require("@modules/search/infrastructure/search/PostgresSearchProvider");
const SearchRepository_1 = require("@modules/search/infrastructure/repositories/SearchRepository");
const SearchQueryHandler_1 = require("@modules/search/application/handlers/SearchQueryHandler");
const SearchQuery_1 = require("@modules/search/application/queries/SearchQuery");
const SearchDocument_1 = require("@modules/search/domain/models/SearchDocument");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
describe('Search API Integration', () => {
    let pool;
    let handler;
    let provider;
    beforeAll(async () => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        provider = new PostgresSearchProvider_1.PostgresSearchProvider(pool);
        const repository = new SearchRepository_1.SearchRepository(provider);
        const mockMetrics = { incrementCounter: jest.fn(), observeDuration: jest.fn() };
        handler = new SearchQueryHandler_1.SearchQueryHandler(repository, mockMetrics);
        await provider.createIndex('test');
    });
    afterAll(async () => {
        await provider.deleteIndex('test');
        await pool.end();
    });
    it('should search for documents', async () => {
        const doc = new SearchDocument_1.SearchDocument(new UniqueEntityId_1.UniqueEntityId(), 'article', new UniqueEntityId_1.UniqueEntityId(), { title: 'Integration Test' });
        await provider.index(doc);
        const query = new SearchQuery_1.SearchQuery({ query: 'Integration' });
        const result = await handler.handle(query);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].title).toBe('Integration Test');
    });
});
//# sourceMappingURL=SearchApi.spec.js.map