import { injectable, inject } from 'inversify';
import { UserCreatedEvent } from '@modules/auth/domain/events/UserCreatedEvent';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchAggregate } from '@modules/search/domain/models/SearchAggregate';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IDomainEventHandler } from '@modules/search/application/events/EntityCreatedIndexer';

@injectable()
export class UserCreatedIndexer implements IDomainEventHandler<UserCreatedEvent> {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const document = new SearchDocument(
      new UniqueEntityId(),
      'user',
      (event as any).user.id,
      { 
        email: (event as any).user.email
      }
    );
    const aggregate = SearchAggregate.create(document);
    await this.searchRepository.save(aggregate.getDocument());
  }
}
