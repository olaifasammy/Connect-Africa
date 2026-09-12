import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipTypeCreatedEvent extends DomainEvent {
  constructor(public readonly relationshipTypeId: UniqueEntityId) {
    super(relationshipTypeId);
  }
}
