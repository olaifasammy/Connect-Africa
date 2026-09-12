import { DomainEvent } from '@shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';

export class OntologyArchivedEvent extends DomainEvent {
  constructor(public readonly ontologyId: OntologyId) {
    super(ontologyId);
  }
}
