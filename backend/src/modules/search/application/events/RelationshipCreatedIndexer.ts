import { injectable, inject } from 'inversify';
import { RelationshipCreatedEvent } from '@modules/relationship/domain/events/RelationshipCreatedEvent';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IDomainEventHandler } from '@modules/search/application/events/EntityCreatedIndexer';

@injectable()
export class RelationshipCreatedIndexer implements IDomainEventHandler<RelationshipCreatedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: RelationshipCreatedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'relationship',
      (event as any).relationship.id,
      { 
        sourceId: (event as any).relationship.sourceId,
        targetId: (event as any).relationship.targetId,
        type: (event as any).relationship.type
      }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
