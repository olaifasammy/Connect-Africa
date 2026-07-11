import { SourceId } from '../../domain/value-objects/SourceValueObjects';
export declare class GetSourceQuery {
    readonly sourceId: SourceId;
    constructor(sourceId: SourceId);
}
export declare class SearchSourcesQuery {
    readonly searchTerm: string;
    constructor(searchTerm: string);
}
