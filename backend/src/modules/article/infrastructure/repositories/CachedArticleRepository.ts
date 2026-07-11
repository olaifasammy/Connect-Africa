import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export class CachedArticleRepository implements IArticleRepository {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly cache: CacheProvider,
    private readonly ttl: number = 3600
  ) {}

  async findById(id: UniqueEntityId): Promise<Article | null> {
    const cacheKey = `article:id:${id.toString()}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return JSON.parse(cached); // Note: Simple serialization, needs better mapping

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

  async save(article: Article): Promise<void> {
    await this.repository.save(article);
    await this.cache.delete(`article:id:${article.id.toString()}`);
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
