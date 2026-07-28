import { injectable, inject } from 'inversify';
import { SourceCreatedEvent } from '@modules/source/public';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IDomainEventHandler } from '@modules/search/application/events/EntityCreatedIndexer';

@injectable()
export class SourceCreatedIndexer implements IDomainEventHandler<SourceCreatedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: SourceCreatedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'source',
      (event as any).source.id,
      { 
        title: (event as any).source.title,
        url: (event as any).source.url
      }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
