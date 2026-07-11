import { Pool } from 'pg';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class PostgresArticleRepository implements IArticleRepository {
    private readonly db;
    constructor(db: Pool);
    private mapRowToArticle;
    findById(id: UniqueEntityId): Promise<Article | null>;
    findBySlug(slug: string): Promise<Article | null>;
    save(article: Article): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
}
