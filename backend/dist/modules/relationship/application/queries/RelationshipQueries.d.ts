import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetRelationshipQuery implements IQuery {
    readonly id: string;
    constructor(id: string);
}
export declare class ListRelationshipsQuery implements IQuery {
    readonly limit: number;
    readonly offset: number;
    constructor(limit: number, offset: number);
}
export declare class GetRelationshipsForEntityQuery implements IQuery {
    readonly entityId: string;
    constructor(entityId: string);
}
export declare class GetIncomingRelationshipsQuery implements IQuery {
    readonly targetEntityId: string;
    constructor(targetEntityId: string);
}
export declare class GetOutgoingRelationshipsQuery implements IQuery {
    readonly sourceEntityId: string;
    constructor(sourceEntityId: string);
}
export declare class SearchRelationshipsQuery implements IQuery {
    readonly query: string;
    constructor(query: string);
}
export declare class GetRelationshipVersionQuery implements IQuery {
    readonly relationshipId: string;
    readonly versionNumber: number;
    constructor(relationshipId: string, versionNumber: number);
}
