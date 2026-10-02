import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
import { EntityTypeCreatedEvent } from '../events/EntityTypeCreatedEvent';
import { EntityTypeUpdatedEvent } from '../events/EntityTypeUpdatedEvent';
import { EntityTypeDeletedEvent } from '../events/EntityTypeDeletedEvent';
import { DomainError } from '../errors/DomainError';

export interface EntityTypeProps {
  ontologyId: OntologyId;
  name: string;
  description: string;
  displayName?: string;
  pluralDisplayName?: string;
  icon?: string;
  color?: string;
  namespaceUri?: string;
  parentEntityId?: string;
  isDraft?: boolean;
}

export class EntityType extends AggregateRoot<EntityTypeProps> {
  private constructor(
    props: EntityTypeProps,
    id?: UniqueEntityId,
  ) {
    super(
      {
        ...props,
        name: props.name.trim(),
        description: props.description.trim(),
      },
      id,
    );

    this.validateInvariants();
  }

  public static create(
    props: EntityTypeProps,
    id?: UniqueEntityId,
  ): EntityType {
    const entityType = new EntityType(
      props,
      id,
    );

    if (!id) {
      entityType.addDomainEvent(
        new EntityTypeCreatedEvent(
          entityType.id,
        ),
      );
    }

    return entityType;
  }

  public static reconstruct(
    props: EntityTypeProps,
    id: UniqueEntityId,
  ): EntityType {
    return new EntityType(props, id);
  }

  private validateInvariants(): void {
    if (!this.props.ontologyId) {
      throw new DomainError(
        'Entity Type must belong to an ontology.',
      );
    }

    if (!this.props.name) {
      throw new DomainError(
        'Entity Type name is required.',
      );
    }

    if (this.props.name.length > 255) {
      throw new DomainError(
        'Entity Type name cannot exceed 255 characters.',
      );
    }
  }

  public update(
    name: string,
    description: string,
    displayName?: string,
    pluralDisplayName?: string,
    icon?: string,
    color?: string,
    namespaceUri?: string,
    parentEntityId?: string,
    isDraft?: boolean,
  ): void {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new DomainError(
        'Entity Type name is required.',
      );
    }

    if (normalizedName.length > 255) {
      throw new DomainError(
        'Entity Type name cannot exceed 255 characters.',
      );
    }

    this.props.name = normalizedName;
    this.props.description =
      description?.trim() ?? '';
    this.props.displayName = displayName?.trim() || undefined;
    this.props.pluralDisplayName = pluralDisplayName?.trim() || undefined;
    this.props.icon = icon?.trim() || undefined;
    this.props.color = color?.trim() || undefined;
    this.props.namespaceUri = namespaceUri?.trim() || undefined;
    this.props.parentEntityId = parentEntityId?.trim() || undefined;
    this.props.isDraft = isDraft ?? false;

    this.addDomainEvent(
      new EntityTypeUpdatedEvent(this.id),
    );
  }

  public delete(): void {
    this.addDomainEvent(
      new EntityTypeDeletedEvent(this.id),
    );
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get displayName(): string | undefined {
    return this.props.displayName;
  }

  get pluralDisplayName(): string | undefined {
    return this.props.pluralDisplayName;
  }

  get icon(): string | undefined {
    return this.props.icon;
  }

  get color(): string | undefined {
    return this.props.color;
  }

  get namespaceUri(): string | undefined {
    return this.props.namespaceUri;
  }

  get parentEntityId(): string | undefined {
    return this.props.parentEntityId;
  }

  get isDraft(): boolean {
    return this.props.isDraft ?? false;
  }

  get ontologyId(): OntologyId {
    return this.props.ontologyId;
  }
}