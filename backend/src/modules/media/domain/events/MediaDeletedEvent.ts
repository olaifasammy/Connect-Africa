import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MediaDeletedEvent extends DomainEvent {
  constructor(aggregateId: UniqueEntityId) {
    super(aggregateId);
  }
}
