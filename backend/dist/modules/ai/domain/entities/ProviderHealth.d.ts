export declare class ProviderHealth {
    readonly providerId: string;
    readonly status: 'HEALTHY' | 'UNHEALTHY';
    readonly lastCheckedAt: Date;
    readonly latencyMs: number;
    constructor(providerId: string, status: 'HEALTHY' | 'UNHEALTHY', lastCheckedAt: Date, latencyMs: number);
}
