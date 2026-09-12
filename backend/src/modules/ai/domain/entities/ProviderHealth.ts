export class ProviderHealth {
  constructor(
    public readonly providerId: string,
    public readonly status: 'HEALTHY' | 'UNHEALTHY',
    public readonly lastCheckedAt: Date,
    public readonly latencyMs: number
  ) {}
}
