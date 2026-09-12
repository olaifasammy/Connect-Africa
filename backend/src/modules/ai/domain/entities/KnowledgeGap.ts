export class KnowledgeGap {
  constructor(
    public readonly id: string,
    public readonly topic: string,
    public readonly requestedPrompt: string,
    public readonly status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED',
    public readonly createdAt: Date
  ) {}
}
