import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class RelationshipTypeUpdatedEvent extends DomainEvent {
    readonly relationshipTypeId: UniqueEntityId;
    constructor(relationshipTypeId: UniqueEntityId);
}
