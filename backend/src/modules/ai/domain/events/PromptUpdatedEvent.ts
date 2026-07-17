export class PromptUpdatedEvent {
  constructor(
    public readonly promptId: string,
    public readonly version: number,
    public readonly timestamp: Date
  ) {}
}
