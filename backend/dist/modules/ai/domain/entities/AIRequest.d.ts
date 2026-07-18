export declare class AIRequest {
    readonly id: string;
    readonly prompt: string;
    readonly providerId: string;
    readonly timestamp: Date;
    constructor(id: string, prompt: string, providerId: string, timestamp: Date);
}
