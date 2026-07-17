export class AIRequest {
  constructor(
    public readonly id: string,
    public readonly prompt: string,
    public readonly providerId: string,
    public readonly timestamp: Date
  ) {}
}
