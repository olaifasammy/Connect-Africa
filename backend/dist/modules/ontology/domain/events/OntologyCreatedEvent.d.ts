import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { OntologyId } from '../value-objects/OntologyId';
export declare class OntologyCreatedEvent extends DomainEvent {
    readonly ontologyId: OntologyId;
    readonly name: string;
    constructor(ontologyId: OntologyId, name: string);
}
