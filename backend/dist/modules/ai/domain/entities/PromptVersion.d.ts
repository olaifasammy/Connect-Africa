export declare class PromptVersion {
    readonly id: string;
    readonly promptId: string;
    readonly content: string;
    readonly version: number;
    readonly createdAt: Date;
    constructor(id: string, promptId: string, content: string, version: number, createdAt: Date);
}
