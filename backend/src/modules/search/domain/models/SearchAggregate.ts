import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { SearchDocument } from '../models/SearchDocument';
import { SearchIndexedEvent } from '../events/SearchIndexedEvent';

export class SearchAggregate extends AggregateRoot<SearchDocument> {
  constructor(props: SearchDocument, id?: UniqueEntityId) {
    super(props, id || props.id);
    this.validateInvariants(props);
  }

  private validateInvariants(document: SearchDocument): void {
    if (!document.id) {
      throw new Error('Search Document must have an ID');
    }
    if (!document.resourceType || document.resourceType.trim() === '') {
      throw new Error('Search Document must have a resource type');
    }
  }

  public static create(document: SearchDocument): SearchAggregate {
    const aggregate = new SearchAggregate(document);
    aggregate.addDomainEvent(new SearchIndexedEvent(document.id));
    return aggregate;
  }

  public getDocument(): SearchDocument {
    return this.props;
  }
}
