export declare class PromptUpdatedEvent {
    readonly promptId: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(promptId: string, version: number, timestamp: Date);
}
