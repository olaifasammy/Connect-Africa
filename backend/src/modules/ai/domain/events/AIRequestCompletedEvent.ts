export class AIRequestCompletedEvent {
  constructor(
    public readonly requestId: string,
    public readonly timestamp: Date
  ) {}
}
