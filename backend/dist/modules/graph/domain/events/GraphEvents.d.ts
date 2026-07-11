export declare class GraphNodeCreatedEvent {
    readonly nodeId: string;
    readonly type: string;
    constructor(nodeId: string, type: string);
}
export declare class GraphNodeUpdatedEvent {
    readonly nodeId: string;
    readonly metadata: Record<string, any>;
    constructor(nodeId: string, metadata: Record<string, any>);
}
export declare class GraphNodeDeletedEvent {
    readonly nodeId: string;
    constructor(nodeId: string);
}
export declare class GraphEdgeCreatedEvent {
    readonly sourceId: string;
    readonly targetId: string;
    readonly type: string;
    constructor(sourceId: string, targetId: string, type: string);
}
export declare class GraphEdgeUpdatedEvent {
    readonly sourceId: string;
    readonly targetId: string;
    readonly type: string;
    readonly properties: Record<string, any>;
    constructor(sourceId: string, targetId: string, type: string, properties: Record<string, any>);
}
export declare class GraphEdgeDeletedEvent {
    readonly sourceId: string;
    readonly targetId: string;
    readonly type: string;
    constructor(sourceId: string, targetId: string, type: string);
}
