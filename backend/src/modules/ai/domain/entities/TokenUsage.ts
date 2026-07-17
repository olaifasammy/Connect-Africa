export class TokenUsage {
  constructor(
    public readonly id: string,
    public readonly providerId: string,
    public readonly tokensUsed: number,
    public readonly timestamp: Date
  ) {}
}
