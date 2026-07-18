export interface IAiRequest {
    prompt: string;
    context?: Record<string, unknown>;
    provider?: string;
    metadata?: Record<string, unknown>;
}
export interface IAiResponse {
    content: string;
    tokensUsed: number;
    cost?: number;
    provider: string;
}
export interface IAiGateway {
    processRequest(request: IAiRequest): Promise<IAiResponse>;
}
