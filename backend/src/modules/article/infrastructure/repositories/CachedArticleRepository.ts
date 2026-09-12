import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

@provide(CachedArticleRepository, true)
@injectable()
export class CachedArticleRepository implements IArticleRepository {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('CacheProvider') private readonly cache: CacheProvider,
    private readonly ttl: number = 3600
  ) {}

  async findById(id: UniqueEntityId): Promise<Article | null> {
    const cacheKey = `article:id:${id.toString()}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const article = await this.repository.findById(id);

    if (article) {
      await this.cache.set(cacheKey, JSON.stringify(article), this.ttl);
    }

    return article;
  }

  async findBySlug(slug: string): Promise<Article | null> {
    const cacheKey = `article:slug:${slug}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const article = await this.repository.findBySlug(slug);

    if (article) {
      await this.cache.set(cacheKey, JSON.stringify(article), this.ttl);
    }

    return article;
  }

  async findLatest(limit: number, offset: number): Promise<Article[]> {
    return await this.repository.findLatest(limit, offset);
  }

  async findByEntityId(entityId: UniqueEntityId): Promise<Article[]> {
    return await this.repository.findByEntityId(entityId);
  }

  async findByCategory(category: string): Promise<Article[]> {
    return await this.repository.findByCategory(category);
  }

  async search(query: string): Promise<Article[]> {
    return await this.repository.search(query);
  }

  async save(article: Article): Promise<void> {
    await this.repository.save(article);

    await this.cache.delete(`article:id:${article.id.toString()}`);
    await this.cache.delete(`article:slug:${article.slug}`);
  }

  async update(article: Article, expectedVersion: number): Promise<void> {
    const existingArticle = await this.repository.findById(article.id);

    await this.repository.update(article, expectedVersion);

    await this.cache.delete(`article:id:${article.id.toString()}`);

    if (existingArticle) {
      await this.cache.delete(`article:slug:${existingArticle.slug}`);
    }

    await this.cache.delete(`article:slug:${article.slug}`);
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const article = await this.repository.findById(id);

    if (article) {
      await this.cache.delete(`article:id:${id.toString()}`);
      await this.cache.delete(`article:slug:${article.slug}`);
    }

    await this.repository.delete(id);
  }
}
