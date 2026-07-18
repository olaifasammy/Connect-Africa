export declare class ProviderHealthChangedEvent {
    readonly providerId: string;
    readonly status: 'HEALTHY' | 'UNHEALTHY';
    readonly timestamp: Date;
    constructor(providerId: string, status: 'HEALTHY' | 'UNHEALTHY', timestamp: Date);
}
