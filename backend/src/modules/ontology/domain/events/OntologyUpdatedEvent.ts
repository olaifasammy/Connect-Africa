import { DomainEvent } from '@shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';

export class OntologyUpdatedEvent extends DomainEvent {
  constructor(public readonly ontologyId: OntologyId) {
    super(ontologyId);
  }
}
