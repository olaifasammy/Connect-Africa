import { DomainEvent } from '@shared/domain/DomainEvent';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipUpdatedEvent extends DomainEvent {
  constructor(public readonly relationshipId: string) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipDeletedEvent extends DomainEvent {
  constructor(public readonly relationshipId: string) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipPublishedEvent extends DomainEvent {
  constructor(public readonly relationshipId: string) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipArchivedEvent extends DomainEvent {
  constructor(public readonly relationshipId: string) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipRestoredEvent extends DomainEvent {
  constructor(public readonly relationshipId: string) {
    super(new UniqueEntityId(relationshipId));
  }
}

export class RelationshipMergedEvent extends DomainEvent {
  constructor(
    public readonly sourceRelationshipId: string,
    public readonly targetRelationshipId: string
  ) {
    super(new UniqueEntityId(sourceRelationshipId));
  }
}

export class RelationshipVersionCreatedEvent extends DomainEvent {
  constructor(
    public readonly relationshipId: string,
    public readonly versionNumber: number
  ) {
    super(new UniqueEntityId(relationshipId));
  }
}
