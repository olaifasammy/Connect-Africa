import { Article } from '../../../../../src/modules/article/domain/entities/Article';
import { UniqueEntityId } from '../../../../../src/shared/domain/UniqueEntityId';
import { ArticleStatus } from '../../../../../src/modules/article/domain/enums/ArticleStatus';

describe('Article Aggregate', () => {
  it('should create a new article in DRAFT status', () => {
    const props = {
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Summary',
      content: 'Content',
      language: 'en',
      authorId: new UniqueEntityId(),
    };
    const article = Article.create(props);
    expect(article.status).toBe(ArticleStatus.DRAFT);
  });

  it('should publish an article and set status to PUBLISHED', () => {
    const props = {
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Summary',
      content: 'Content',
      language: 'en',
      authorId: new UniqueEntityId(),
    };
    const article = Article.create(props);
    article.submitForReview(); // Hypothetical method to move to review
    article.approve();         // Hypothetical method to move to approved
    article.publish();
    expect(article.status).toBe(ArticleStatus.PUBLISHED);
  });
});
