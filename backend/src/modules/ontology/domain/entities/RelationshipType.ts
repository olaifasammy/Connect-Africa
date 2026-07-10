import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
import { RelationshipTypeCreatedEvent } from '../events/RelationshipTypeCreatedEvent';
import { RelationshipTypeUpdatedEvent } from '../events/RelationshipTypeUpdatedEvent';
import { RelationshipTypeDeletedEvent } from '../events/RelationshipTypeDeletedEvent';

export interface RelationshipTypeProps {
  ontologyId: OntologyId;
  name: string;
  description: string;
  sourceEntityTypeId: UniqueEntityId;
  targetEntityTypeId: UniqueEntityId;
}

export class RelationshipType extends AggregateRoot<RelationshipTypeProps> {
  private constructor(props: RelationshipTypeProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: RelationshipTypeProps, id?: UniqueEntityId): RelationshipType {
    const relationshipType = new RelationshipType(props, id);
    if (!id) {
        relationshipType.addDomainEvent(new RelationshipTypeCreatedEvent(relationshipType.id));
    }
    return relationshipType;
  }

  public update(name: string, description: string): void {
    this.props.name = name;
    this.props.description = description;
    this.addDomainEvent(new RelationshipTypeUpdatedEvent(this.id));
  }

  public delete(): void {
    this.addDomainEvent(new RelationshipTypeDeletedEvent(this.id));
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get sourceEntityTypeId(): UniqueEntityId {
    return this.props.sourceEntityTypeId;
  }

  get targetEntityTypeId(): UniqueEntityId {
    return this.props.targetEntityTypeId;
  }
}
