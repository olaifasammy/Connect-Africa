import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { CacheProvider } from '../../../../shared/infrastructure/cache/CacheProvider';
export declare class CachedArticleRepository implements IArticleRepository {
    private readonly repository;
    private readonly cache;
    private readonly ttl;
    constructor(repository: IArticleRepository, cache: CacheProvider, ttl?: number);
    findById(id: UniqueEntityId): Promise<Article | null>;
    findBySlug(slug: string): Promise<Article | null>;
    save(article: Article): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
}
