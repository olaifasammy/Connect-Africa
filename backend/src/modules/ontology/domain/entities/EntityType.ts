import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
import { EntityTypeCreatedEvent } from '../events/EntityTypeCreatedEvent';
import { EntityTypeUpdatedEvent } from '../events/EntityTypeUpdatedEvent';
import { EntityTypeDeletedEvent } from '../events/EntityTypeDeletedEvent';

export interface EntityTypeProps {
  ontologyId: OntologyId;
  name: string;
  description: string;
}

export class EntityType extends AggregateRoot<EntityTypeProps> {
  private constructor(props: EntityTypeProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: EntityTypeProps, id?: UniqueEntityId): EntityType {
    const entityType = new EntityType(props, id);
    if (!id) {
        entityType.addDomainEvent(new EntityTypeCreatedEvent(entityType.id));
    }
    return entityType;
  }

  public update(name: string, description: string): void {
    this.props.name = name;
    this.props.description = description;
    this.addDomainEvent(new EntityTypeUpdatedEvent(this.id));
  }

  public delete(): void {
    this.addDomainEvent(new EntityTypeDeletedEvent(this.id));
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
}
