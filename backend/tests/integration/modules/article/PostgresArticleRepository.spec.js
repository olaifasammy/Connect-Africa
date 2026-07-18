"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PostgresArticleRepository_1 = require("@modules/article/infrastructure/postgres/PostgresArticleRepository");
const Article_1 = require("@modules/article/domain/entities/Article");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
describe('PostgresArticleRepository Integration', () => {
    let pool;
    let repository;
    beforeAll(async () => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        repository = new PostgresArticleRepository_1.PostgresArticleRepository(pool);
    });
    afterAll(async () => {
        await pool.end();
    });
    it('should save and find an article', async () => {
        const article = Article_1.Article.create({
            title: 'Integration Test Article',
            slug: 'integration-test-article',
            summary: 'Summary for integration test',
            content: 'This is a long content for integration test purpose.',
            language: 'en',
            authorId: new UniqueEntityId_1.UniqueEntityId()
        });
        await repository.save(article);
        const found = await repository.findById(article.id);
        expect(found).not.toBeNull();
        expect(found?.title).toBe('Integration Test Article');
    });
});
//# sourceMappingURL=PostgresArticleRepository.spec.js.map