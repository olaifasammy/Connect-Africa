export declare class KnowledgeGap {
    readonly id: string;
    readonly topic: string;
    readonly requestedPrompt: string;
    readonly status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    readonly createdAt: Date;
    constructor(id: string, topic: string, requestedPrompt: string, status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED', createdAt: Date);
}
