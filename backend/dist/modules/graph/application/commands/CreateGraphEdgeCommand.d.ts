export declare class CreateGraphEdgeCommand {
    readonly sourceEntityId: string;
    readonly targetEntityId: string;
    readonly relationshipType: string;
    constructor(sourceEntityId: string, targetEntityId: string, relationshipType: string);
}
