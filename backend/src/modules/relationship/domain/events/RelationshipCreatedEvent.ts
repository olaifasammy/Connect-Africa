import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipCreatedEvent extends DomainEvent {
  constructor(
    public readonly relationshipId: string,
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipTypeId: string
  ) {
    super(new UniqueEntityId(relationshipId));
  }
}
