import { injectable, inject } from 'inversify';
import { OntologyCreatedEvent } from '@modules/ontology/public';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IDomainEventHandler } from '@modules/search/application/events/EntityCreatedIndexer';

@injectable()
export class OntologyCreatedIndexer implements IDomainEventHandler<OntologyCreatedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: OntologyCreatedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'ontology',
      (event as any).ontology.id,
      { title: (event as any).ontology.name.value }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
