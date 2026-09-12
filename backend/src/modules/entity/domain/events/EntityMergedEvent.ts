import { DomainEvent } from '@shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityMergedEvent extends DomainEvent {
  constructor(
    public readonly sourceEntityId: EntityId,
    public readonly targetEntityId: EntityId
  ) {
    super(new UniqueEntityId(targetEntityId.value));
  }
}
