export declare class GraphNode {
    readonly entityId: string;
    readonly type: string;
    readonly metadata: Record<string, any>;
    constructor(entityId: string, type: string, metadata: Record<string, any>);
    private validate;
}
export declare class GraphEdge {
    readonly sourceEntityId: string;
    readonly targetEntityId: string;
    readonly relationshipType: string;
    constructor(sourceEntityId: string, targetEntityId: string, relationshipType: string);
    private validate;
}
