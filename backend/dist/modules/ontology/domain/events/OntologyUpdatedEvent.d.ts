import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';
export declare class OntologyUpdatedEvent extends DomainEvent {
    readonly ontologyId: OntologyId;
    constructor(ontologyId: OntologyId);
}
