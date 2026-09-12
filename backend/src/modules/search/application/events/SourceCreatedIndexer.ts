import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  SourceCreatedEvent,
} from '@modules/source/public';

import {
  ISearchRepository,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchDocument,
} from '../../domain/models/SearchDocument';

@provide(SourceCreatedIndexer, true)
@injectable()
export class SourceCreatedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository:
      ISearchRepository,
  ) {}

  async handle(
    event: SourceCreatedEvent,
  ): Promise<void> {
    const resourceId =
      event.sourceId;

    const document =
      new SearchDocument({
        id: resourceId,
        resourceType: 'source',
        resourceId,
        content: {
          resourceId:
            resourceId.toString(),
        },
        createdAt: new Date(),
      });

    await this.searchRepository.save(
      document,
    );
  }
}