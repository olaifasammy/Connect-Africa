export class ProviderHealthChangedEvent {
  constructor(
    public readonly providerId: string,
    public readonly status: 'HEALTHY' | 'UNHEALTHY',
    public readonly timestamp: Date
  ) {}
}
