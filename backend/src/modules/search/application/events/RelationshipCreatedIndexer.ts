import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { RelationshipCreatedEvent } from '@modules/relationship/public';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(RelationshipCreatedIndexer, true)
@injectable()
export class RelationshipCreatedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository: ISearchRepository,
  ) {}

  async handle(
    event: RelationshipCreatedEvent,
  ): Promise<void> {
    const resourceId =
      new UniqueEntityId(
        event.relationshipId,
      );

    const document =
      new SearchDocument({
        id: resourceId,
        resourceType: 'relationship',
        resourceId,
        content: {
          sourceEntityId:
            event.sourceEntityId,
          targetEntityId:
            event.targetEntityId,
          relationshipTypeId:
            event.relationshipTypeId,
        },
        createdAt: new Date(),
      });

    await this.searchRepository.save(
      document,
    );
  }
}