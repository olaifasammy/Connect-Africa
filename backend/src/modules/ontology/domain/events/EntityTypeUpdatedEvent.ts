import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityTypeUpdatedEvent extends DomainEvent {
  constructor(public readonly entityTypeId: UniqueEntityId) {
    super(entityTypeId);
  }
}
