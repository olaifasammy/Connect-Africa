import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { EntityCreatedEvent } from '@modules/entity/public';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(EntityCreatedIndexer, true)
@injectable()
export class EntityCreatedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository: ISearchRepository,
  ) {}

  async handle(
    event: EntityCreatedEvent,
  ): Promise<void> {
    const resourceId =
      event.entity.id;

    const document = new SearchDocument({
      id: resourceId,
      resourceType: 'entity',
      resourceId,
      content: {
        title: event.entity.name.value,
        type: event.entity.type,
      },
      createdAt: new Date(),
    });

    await this.searchRepository.save(
      document,
    );
  }
}