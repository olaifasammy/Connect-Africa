import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { OntologyId } from '../value-objects/OntologyId';
import { OntologyCreatedEvent } from '../events/OntologyCreatedEvent';
import { OntologyUpdatedEvent } from '../events/OntologyUpdatedEvent';
import { OntologyPublishedEvent } from '../events/OntologyPublishedEvent';
import { OntologyArchivedEvent } from '../events/OntologyArchivedEvent';
import { DomainError } from '../errors/DomainError';

interface OntologyProps {
  name: string;
  description: string;
  version: number;
  isPublished: boolean;
  isArchived: boolean;
}

export class Ontology extends AggregateRoot<OntologyProps> {
  private constructor(props: OntologyProps, id?: OntologyId) {
    super(props, id);
    this.validate(props);
  }

  private validate(props: OntologyProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new DomainError('Ontology name is required.');
    }
    if (props.version < 1) {
      throw new DomainError('Ontology version must be at least 1.');
    }
  }

  public static create(props: OntologyProps, id?: OntologyId): Ontology {
    const ontology = new Ontology(props, id);
    
    if (!id) {
      ontology.addDomainEvent(new OntologyCreatedEvent(ontology.id, props.name));
    }
    
    return ontology;
  }

  public update(name: string, description: string): void {
    this.props.name = name;
    this.props.description = description;
    this.addDomainEvent(new OntologyUpdatedEvent(this.id));
  }

  public publish(): void {
    if (this.props.isArchived) {
      throw new DomainError('Cannot publish an archived ontology.');
    }
    this.props.isPublished = true;
    this.addDomainEvent(new OntologyPublishedEvent(this.id));
  }

  public archive(): void {
    this.props.isArchived = true;
    this.addDomainEvent(new OntologyArchivedEvent(this.id));
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
