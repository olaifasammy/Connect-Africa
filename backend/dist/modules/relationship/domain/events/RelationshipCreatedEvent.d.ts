import { DomainEvent } from '../../../../shared/domain/DomainEvent';
export declare class RelationshipCreatedEvent extends DomainEvent {
    readonly relationshipId: string;
    readonly sourceEntityId: string;
    readonly targetEntityId: string;
    readonly relationshipTypeId: string;
    constructor(relationshipId: string, sourceEntityId: string, targetEntityId: string, relationshipTypeId: string);
}
