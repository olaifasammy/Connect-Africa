export declare class TraverseGraphQuery {
    readonly entityId: string;
    readonly maxDepth: number;
    readonly mode: 'depth' | 'breadth';
    constructor(entityId: string, maxDepth: number, mode?: 'depth' | 'breadth');
}
