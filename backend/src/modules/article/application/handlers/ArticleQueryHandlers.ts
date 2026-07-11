import { GetArticleQuery, GetArticleBySlugQuery, SearchArticlesQuery, GetLatestArticlesQuery, GetArticlesByEntityQuery, GetArticlesByCategoryQuery } from '../queries/ArticleQueries';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';

export class GetArticleHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: GetArticleQuery): Promise<Article | null> {
    return await this.repository.findById(query.articleId);
  }
}

export class GetArticleBySlugHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: GetArticleBySlugQuery): Promise<Article | null> {
    return await this.repository.findBySlug(query.slug);
  }
}

export class SearchArticlesHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: SearchArticlesQuery): Promise<Article[]> {
    return [];
  }
}

export class GetLatestArticlesHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: GetLatestArticlesQuery): Promise<Article[]> {
    return [];
  }
}

export class GetArticlesByEntityHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: GetArticlesByEntityQuery): Promise<Article[]> {
    return [];
  }
}

export class GetArticlesByCategoryHandler {
  constructor(private readonly repository: IArticleRepository) {}

  async handle(query: GetArticlesByCategoryQuery): Promise<Article[]> {
    return [];
  }
}
