import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipUpdatedEvent extends DomainEvent {
  constructor(
    public readonly relationshipId: string,
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly previousRelationshipTypeId: string,
    public readonly relationshipTypeId: string,
  ) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipDeletedEvent extends DomainEvent {
  constructor(
    public readonly relationshipId: string,
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipTypeId: string,
  ) {
    super(new UniqueEntityId(relationshipId));
  }
}
