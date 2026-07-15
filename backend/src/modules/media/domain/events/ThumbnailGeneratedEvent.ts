import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ThumbnailGeneratedEvent extends DomainEvent {
  constructor(aggregateId: UniqueEntityId) {
    super(aggregateId);
  }
}
