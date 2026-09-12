import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { OntologyId } from '../value-objects/OntologyId';
import { OntologyCreatedEvent } from '../events/OntologyCreatedEvent';
import { OntologyUpdatedEvent } from '../events/OntologyUpdatedEvent';
import { OntologyPublishedEvent } from '../events/OntologyPublishedEvent';
import { OntologyArchivedEvent } from '../events/OntologyArchivedEvent';
import { DomainError } from '../errors/DomainError';

export interface OntologyProps {
  name: string;
  description: string;
  version: number;
  isPublished: boolean;
  isArchived: boolean;
}

export class Ontology extends AggregateRoot<OntologyProps> {
  private constructor(
    props: OntologyProps,
    id?: OntologyId,
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
    props: OntologyProps,
    id?: OntologyId,
  ): Ontology {
    const ontology = new Ontology(props, id);

    if (!id) {
      ontology.addDomainEvent(
        new OntologyCreatedEvent(
          ontology.id,
          ontology.name,
        ),
      );
    }

    return ontology;
  }

  /**
   * Reconstruct an existing persisted Ontology.
   *
   * Rehydration must never emit creation events.
   */
  public static reconstruct(
    props: OntologyProps,
    id: OntologyId,
  ): Ontology {
    return new Ontology(props, id);
  }

  private validateInvariants(): void {
    if (!this.props.name) {
      throw new DomainError(
        'Ontology name is required.',
      );
    }

    if (this.props.name.length > 255) {
      throw new DomainError(
        'Ontology name cannot exceed 255 characters.',
      );
    }

    if (this.props.version < 1) {
      throw new DomainError(
        'Ontology version must be at least 1.',
      );
    }

    if (
      !Number.isInteger(this.props.version)
    ) {
      throw new DomainError(
        'Ontology version must be an integer.',
      );
    }

    if (
      this.props.isArchived &&
      this.props.isPublished
    ) {
      throw new DomainError(
        'An archived ontology cannot be published.',
      );
    }
  }

  public update(
    name: string,
    description: string,
  ): void {
    if (this.props.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot be updated.',
      );
    }

    if (this.props.isPublished) {
      throw new DomainError(
        'Published ontologies cannot be structurally updated.',
      );
    }

    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new DomainError(
        'Ontology name is required.',
      );
    }

    if (normalizedName.length > 255) {
      throw new DomainError(
        'Ontology name cannot exceed 255 characters.',
      );
    }

    this.props.name = normalizedName;
    this.props.description =
      description?.trim() ?? '';

    this.addDomainEvent(
      new OntologyUpdatedEvent(this.id),
    );
  }

  public publish(): void {
    if (this.props.isArchived) {
      throw new DomainError(
        'Cannot publish an archived ontology.',
      );
    }

    if (this.props.isPublished) {
      throw new DomainError(
        'Ontology is already published.',
      );
    }

    this.props.isPublished = true;

    this.addDomainEvent(
      new OntologyPublishedEvent(this.id),
    );
  }

  public archive(): void {
    if (this.props.isArchived) {
      throw new DomainError(
        'Ontology is already archived.',
      );
    }

    this.props.isArchived = true;

    this.addDomainEvent(
      new OntologyArchivedEvent(this.id),
    );
  }

  public incrementVersion(): number {
    if (this.props.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot create new versions.',
      );
    }

    this.props.version += 1;

    return this.props.version;
  }

  get id(): OntologyId {
    return this._id as OntologyId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get version(): number {
    return this.props.version;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }

  get isArchived(): boolean {
    return this.props.isArchived;
  }
}