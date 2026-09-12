import {
  inject,
  injectable,
} from 'inversify';
import {
  provide,
} from 'inversify-binding-decorators';

import {
  ArticlePublishedEvent,
} from '@modules/article/public';

import {
  ISearchRepository,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchDocument,
} from '../../domain/models/SearchDocument';

@provide(
  ArticlePublishedIndexer,
  true,
)
@injectable()
export class ArticlePublishedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository:
      ISearchRepository,
  ) {}

  async handle(
    event: ArticlePublishedEvent,
  ): Promise<void> {
    const resourceId =
      event.aggregateId;

    const document =
      new SearchDocument({
        id: resourceId,
        resourceType: 'article',
        resourceId,
        content: {
          resourceId:
            resourceId.toString(),
          status: 'PUBLISHED',
        },
        createdAt:
          event.occurredOn,
      });

    await this.searchRepository.save(
      document,
    );
  }
}