import { injectable, inject } from 'inversify';
import { EntityCreatedEvent } from '@modules/entity/domain/events/EntityCreatedEvent';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IDomainEventHandler<T> {
  handle(event: T): Promise<void>;
}

@injectable()
export class EntityCreatedIndexer implements IDomainEventHandler<EntityCreatedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: EntityCreatedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'entity',
      event.entity.id,
      { 
        title: event.entity.name.value,
        type: event.entity.type
      }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
