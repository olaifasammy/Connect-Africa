export declare class TokenUsage {
    readonly id: string;
    readonly providerId: string;
    readonly tokensUsed: number;
    readonly timestamp: Date;
    constructor(id: string, providerId: string, tokensUsed: number, timestamp: Date);
}
