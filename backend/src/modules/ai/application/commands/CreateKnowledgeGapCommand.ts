export class CreateKnowledgeGapCommand {
  constructor(
    public readonly topic: string,
    public readonly prompt: string
  ) {}
}
