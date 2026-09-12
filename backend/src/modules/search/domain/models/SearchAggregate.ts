import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import {
  SearchDocument,
} from './SearchDocument';

import {
  SearchIndexedEvent,
} from '../events/SearchIndexedEvent';

export class SearchAggregate
  extends AggregateRoot<SearchDocument>
{
  constructor(
    document: SearchDocument,
  ) {
    SearchAggregate.validateDocument(
      document,
    );

    super(
      document,
      document.id,
    );
  }

  private static validateDocument(
    document: SearchDocument,
  ): void {
    if (!document) {
      throw new Error(
        'Search document is required.',
      );
    }

    if (
      !document.id ||
      document.id.toString().trim() === ''
    ) {
      throw new Error(
        'Search document must have a valid ID.',
      );
    }

    if (
      !document.resourceId ||
      document.resourceId.toString().trim() === ''
    ) {
      throw new Error(
        'Search document must have a valid resource ID.',
      );
    }

    if (
      !document.resourceType ||
      document.resourceType.trim() === ''
    ) {
      throw new Error(
        'Search document must have a valid resource type.',
      );
    }
  }

  public static create(
    document: SearchDocument,
  ): SearchAggregate {
    const aggregate =
      new SearchAggregate(document);

    aggregate.addDomainEvent(
      new SearchIndexedEvent(
        document.id,
      ),
    );

    return aggregate;
  }

  public getDocument(): SearchDocument {
    return this.props;
  }
}