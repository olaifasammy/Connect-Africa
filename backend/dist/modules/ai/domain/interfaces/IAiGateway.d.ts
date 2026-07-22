export interface IAiRequest {
    prompt: string;
    templateName?: string;
    context?: Record<string, unknown>;
    provider?: string;
    metadata?: Record<string, unknown>;
}
export interface IAiResponse {
    content: string;
    tokenCount: number;
    tokensUsed: number;
    cost?: number;
    provider: string;
}
export interface IAiGateway {
    processRequest(request: IAiRequest): Promise<IAiResponse>;
}
