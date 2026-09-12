import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import {
  GetArticleQuery,
  GetArticleBySlugQuery,
  SearchArticlesQuery,
  GetLatestArticlesQuery,
  GetArticlesByEntityQuery,
  GetArticlesByCategoryQuery,
} from '../queries/ArticleQueries';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';

@provide(GetArticleHandler, true)
@injectable()
export class GetArticleHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: GetArticleQuery,
  ): Promise<Article | null> {
    return await this.repository.findById(
      query.articleId,
    );
  }
}

@provide(GetArticleBySlugHandler, true)
@injectable()
export class GetArticleBySlugHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: GetArticleBySlugQuery,
  ): Promise<Article | null> {
    return await this.repository.findBySlug(
      query.slug,
    );
  }
}

@provide(SearchArticlesHandler, true)
@injectable()
export class SearchArticlesHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: SearchArticlesQuery,
  ): Promise<Article[]> {
    return await this.repository.search(
      query.searchTerm,
    );
  }
}

@provide(GetLatestArticlesHandler, true)
@injectable()
export class GetLatestArticlesHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: GetLatestArticlesQuery,
  ): Promise<Article[]> {
    return await this.repository.findLatest(
      query.limit ?? 20,
      0,
    );
  }
}

@provide(GetArticlesByEntityHandler, true)
@injectable()
export class GetArticlesByEntityHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: GetArticlesByEntityQuery,
  ): Promise<Article[]> {
    return await this.repository.findByEntityId(
      query.entityId,
    );
  }
}

@provide(GetArticlesByCategoryHandler, true)
@injectable()
export class GetArticlesByCategoryHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,
  ) {}

  async handle(
    query: GetArticlesByCategoryQuery,
  ): Promise<Article[]> {
    return await this.repository.findByCategory(
      query.category,
    );
  }
}
