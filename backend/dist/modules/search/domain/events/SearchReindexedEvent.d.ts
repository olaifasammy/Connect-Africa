import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SearchReindexedEvent extends DomainEvent {
    readonly documentId: UniqueEntityId;
    constructor(documentId: UniqueEntityId);
}
