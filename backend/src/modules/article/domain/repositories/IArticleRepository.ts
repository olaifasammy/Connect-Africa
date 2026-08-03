import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IArticleRepository {
  findById(id: UniqueEntityId): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  save(article: Article): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
