import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IArticleRepository {
  findById(id: UniqueEntityId): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  findLatest(limit: number, offset: number): Promise<Article[]>;
  findByEntityId(entityId: UniqueEntityId): Promise<Article[]>;
  findByCategory(category: string): Promise<Article[]>;
  search(query: string): Promise<Article[]>;
  save(article: Article): Promise<void>;
  update(article: Article, expectedVersion: number): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
