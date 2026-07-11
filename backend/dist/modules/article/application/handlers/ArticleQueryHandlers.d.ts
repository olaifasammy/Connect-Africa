import { GetArticleQuery, GetArticleBySlugQuery, SearchArticlesQuery, GetLatestArticlesQuery, GetArticlesByEntityQuery, GetArticlesByCategoryQuery } from '../queries/ArticleQueries';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
export declare class GetArticleHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: GetArticleQuery): Promise<Article | null>;
}
export declare class GetArticleBySlugHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: GetArticleBySlugQuery): Promise<Article | null>;
}
export declare class SearchArticlesHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: SearchArticlesQuery): Promise<Article[]>;
}
export declare class GetLatestArticlesHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: GetLatestArticlesQuery): Promise<Article[]>;
}
export declare class GetArticlesByEntityHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: GetArticlesByEntityQuery): Promise<Article[]>;
}
export declare class GetArticlesByCategoryHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(query: GetArticlesByCategoryQuery): Promise<Article[]>;
}
