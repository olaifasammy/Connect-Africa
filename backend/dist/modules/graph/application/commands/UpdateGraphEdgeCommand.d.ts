export declare class UpdateGraphEdgeCommand {
    readonly sourceEntityId: string;
    readonly targetEntityId: string;
    readonly relationshipType: string;
    readonly properties: Record<string, any>;
    constructor(sourceEntityId: string, targetEntityId: string, relationshipType: string, properties: Record<string, any>);
}
