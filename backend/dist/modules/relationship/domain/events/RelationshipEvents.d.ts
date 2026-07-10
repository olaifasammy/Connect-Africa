import { DomainEvent } from '../../../../shared/domain/DomainEvent';
export declare class RelationshipUpdatedEvent extends DomainEvent {
    readonly relationshipId: string;
    constructor(relationshipId: string);
}
export declare class RelationshipDeletedEvent extends DomainEvent {
    readonly relationshipId: string;
    constructor(relationshipId: string);
}
export declare class RelationshipPublishedEvent extends DomainEvent {
    readonly relationshipId: string;
    constructor(relationshipId: string);
}
export declare class RelationshipArchivedEvent extends DomainEvent {
    readonly relationshipId: string;
    constructor(relationshipId: string);
}
export declare class RelationshipRestoredEvent extends DomainEvent {
    readonly relationshipId: string;
    constructor(relationshipId: string);
}
export declare class RelationshipMergedEvent extends DomainEvent {
    readonly sourceRelationshipId: string;
    readonly targetRelationshipId: string;
    constructor(sourceRelationshipId: string, targetRelationshipId: string);
}
export declare class RelationshipVersionCreatedEvent extends DomainEvent {
    readonly relationshipId: string;
    readonly versionNumber: number;
    constructor(relationshipId: string, versionNumber: number);
}
