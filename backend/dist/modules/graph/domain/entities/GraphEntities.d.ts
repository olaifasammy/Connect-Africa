export interface SourceCitation {
    sourceId: string;
    confidence: number;
    provenance: string;
}
export declare class GraphNode {
    readonly entityId: string;
    readonly type: string;
    readonly labels: string[];
    readonly metadata: Record<string, any>;
    readonly sources: SourceCitation[];
    constructor(entityId: string, type: string, labels: string[], metadata: Record<string, any>, sources?: SourceCitation[]);
    updateMetadata(newMetadata: Record<string, any>): void;
    addSource(source: SourceCitation): void;
    private validate;
}
export declare class GraphEdge {
    readonly sourceEntityId: string;
    readonly targetEntityId: string;
    readonly relationshipType: string;
    readonly properties: Record<string, any>;
    readonly sources: SourceCitation[];
    constructor(sourceEntityId: string, targetEntityId: string, relationshipType: string, properties: Record<string, any>, sources?: SourceCitation[]);
    addSource(source: SourceCitation): void;
    private validate;
}
