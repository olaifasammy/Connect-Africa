import { DomainEvent } from '@shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityAliasAddedEvent extends DomainEvent {
  constructor(
    public readonly entityId: EntityId,
    public readonly alias: string
  ) {
    super(new UniqueEntityId(entityId.value));
  }
}
