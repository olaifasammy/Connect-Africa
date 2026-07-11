export declare class CreateGraphNodeCommand {
    readonly entityId: string;
    readonly type: string;
    readonly metadata: Record<string, any>;
    constructor(entityId: string, type: string, metadata: Record<string, any>);
}
