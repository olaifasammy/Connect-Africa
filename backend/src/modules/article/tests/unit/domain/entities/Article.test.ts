import { Article } from '../../../../domain/entities/Article';
import { ArticleStatus } from '../../../../domain/enums/ArticleStatus';
import { ArticleDomainError } from '../../../../domain/errors/ArticleDomainErrors';
import { EntityLink } from '../../../../domain/value-objects/EntityLink';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('Article Entity', () => {
  const authorId = new UniqueEntityId();

  it('should create a new article with DRAFT status and version 1', () => {
    const article = Article.create({
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Test summary',
      content: 'Test content body',
      language: 'en',
      authorId,
    });

    expect(article.title).toBe('Test Article');
    expect(article.slug).toBe('test-article');
    expect(article.status).toBe(ArticleStatus.DRAFT);
    expect(article.version).toBe(1);
    expect(article.authorId.equals(authorId)).toBe(true);
    expect(article.domainEvents.length).toBe(1);
  });

  it('should update article properties and increment version', () => {
    const article = Article.create({
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Test summary',
      content: 'Test content body',
      language: 'en',
      authorId,
    });

    const initialVersion = article.version;
    article.update('Updated Title', undefined, 'Updated content');

    expect(article.title).toBe('Updated Title');
    expect(article.content).toBe('Updated content');
    expect(article.version).toBe(initialVersion + 1);
  });

  it('should prevent submission without entity links', () => {
    const article = Article.create({
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Test summary',
      content: 'Test content body',
      language: 'en',
      authorId,
    });

    expect(() => article.submitForReview()).toThrow(ArticleDomainError);
  });

  it('should submit article for review when entity link is present', () => {
    const article = Article.create({
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Test summary',
      content: 'Test content body',
      language: 'en',
      authorId,
    });

    article.addEntityLink(new EntityLink(new UniqueEntityId()));
    article.submitForReview();

    expect(article.status).toBe(ArticleStatus.REVIEW);
  });

  it('should approve and publish article through lifecycle', () => {
    const article = Article.create({
      title: 'Test Article',
      slug: 'test-article',
      summary: 'Test summary',
      content: 'Test content body',
      language: 'en',
      authorId,
    });

    article.addEntityLink(new EntityLink(new UniqueEntityId()));
    article.submitForReview();
    article.approve();
    expect(article.status).toBe(ArticleStatus.APPROVED);

    article.publish();
    expect(article.status).toBe(ArticleStatus.PUBLISHED);
    expect(article.publishedAt).toBeDefined();

    article.unpublish();
    expect(article.status).toBe(ArticleStatus.DRAFT);
    expect(article.publishedAt).toBeUndefined();

    article.archive();
    expect(article.status).toBe(ArticleStatus.ARCHIVED);
  });
});
