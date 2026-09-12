import { DomainEvent } from '@shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityDeletedEvent extends DomainEvent {
  constructor(public readonly entityId: EntityId) {
    super(new UniqueEntityId(entityId.value));
  }
}
