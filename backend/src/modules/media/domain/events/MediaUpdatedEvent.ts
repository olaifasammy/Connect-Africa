import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MediaUpdatedEvent extends DomainEvent {
  constructor(aggregateId: UniqueEntityId) {
    super(aggregateId);
  }
}
