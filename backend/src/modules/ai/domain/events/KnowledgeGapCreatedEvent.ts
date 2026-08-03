export class KnowledgeGapCreatedEvent {
  constructor(
    public readonly gapId: string,
    public readonly topic: string,
    public readonly timestamp: Date
  ) {}
}
