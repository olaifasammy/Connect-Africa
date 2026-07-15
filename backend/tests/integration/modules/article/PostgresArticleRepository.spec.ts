import { Pool } from 'pg';
import { PostgresArticleRepository } from '@modules/article/infrastructure/postgres/PostgresArticleRepository';
import { Article } from '@modules/article/domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('PostgresArticleRepository Integration', () => {
  let pool: Pool;
  let repository: PostgresArticleRepository;

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    repository = new PostgresArticleRepository(pool);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should save and find an article', async () => {
    const article = Article.create({
      title: 'Integration Test Article',
      slug: 'integration-test-article',
      summary: 'Summary for integration test',
      content: 'This is a long content for integration test purpose.',
      language: 'en',
      authorId: new UniqueEntityId()
    });
    
    await repository.save(article);
    const found = await repository.findById(article.id);
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Integration Test Article');
  });
});
