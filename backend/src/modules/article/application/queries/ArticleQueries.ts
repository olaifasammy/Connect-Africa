export class GetLatestArticlesQuery {
  constructor(public readonly limit: number = 10) {}
}

export class GetArticlesByEntityQuery {
  constructor(public readonly entityId: UniqueEntityId) {}
}

export class GetArticlesByCategoryQuery {
  constructor(public readonly category: string) {}
}import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetArticleQuery {
  constructor(public readonly articleId: UniqueEntityId) {}
}

export class GetArticleBySlugQuery {
  constructor(public readonly slug: string) {}
}

export class SearchArticlesQuery {
  constructor(public readonly searchTerm: string) {}
}
