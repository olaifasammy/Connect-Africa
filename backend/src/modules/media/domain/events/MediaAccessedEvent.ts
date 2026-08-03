import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MediaAccessedEvent extends DomainEvent {
  constructor(aggregateId: UniqueEntityId) {
    super(aggregateId);
  }
}
