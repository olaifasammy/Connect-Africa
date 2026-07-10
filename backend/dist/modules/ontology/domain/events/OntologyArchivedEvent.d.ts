import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';
export declare class OntologyArchivedEvent extends DomainEvent {
    readonly ontologyId: OntologyId;
    constructor(ontologyId: OntologyId);
}
