import { DomainEvent } from '@shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';

export class OntologyCreatedEvent extends DomainEvent {
  constructor(public readonly ontologyId: OntologyId, public readonly name: string) {
    super(ontologyId);
  }
}
