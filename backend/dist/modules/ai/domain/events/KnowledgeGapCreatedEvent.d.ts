export declare class KnowledgeGapCreatedEvent {
    readonly gapId: string;
    readonly topic: string;
    readonly timestamp: Date;
    constructor(gapId: string, topic: string, timestamp: Date);
}
