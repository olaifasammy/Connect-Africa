import { Article } from '@modules/article/domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { ArticleStatus } from '@modules/article/domain/enums/ArticleStatus';

describe('Article', () => {
  it('should create a new article in DRAFT status', () => {
    const authorId = new UniqueEntityId();
    const article = Article.create({
      title: 'New Article',
      slug: 'new-article',
      summary: 'Summary',
      content: 'Content',
      language: 'en',
      authorId
    });

    expect(article.status).toBe(ArticleStatus.DRAFT);
    expect(article.title).toBe('New Article');
    expect(article.authorId).toBe(authorId);
  });

  it('should transition status from DRAFT to REVIEW', () => {
    const authorId = new UniqueEntityId();
    const article = Article.create({
      title: 'New Article',
      slug: 'new-article',
      summary: 'Summary',
      content: 'Content',
      language: 'en',
      authorId
    });

    article.submitForReview();
    expect(article.status).toBe(ArticleStatus.REVIEW);
  });

  it('should throw error when submitting non-draft/rejected for review', () => {
    const authorId = new UniqueEntityId();
    const article = Article.create({
      title: 'New Article',
      slug: 'new-article',
      summary: 'Summary',
      content: 'Content',
      language: 'en',
      authorId
    });

    article.submitForReview();
    expect(() => article.submitForReview()).toThrow('Only DRAFT or REJECTED articles can be submitted for review');
  });
});
