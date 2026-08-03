import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SearchIndexDeletedEvent extends DomainEvent {
  constructor(public readonly documentId: UniqueEntityId) {
    super(documentId);
  }
}
