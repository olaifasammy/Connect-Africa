import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class OntologyVersionPublishedEvent extends DomainEvent {
    readonly ontologyVersionId: UniqueEntityId;
    constructor(ontologyVersionId: UniqueEntityId);
}
