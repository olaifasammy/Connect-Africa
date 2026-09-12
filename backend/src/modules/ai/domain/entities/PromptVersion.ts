export class PromptVersion {
  constructor(
    public readonly id: string,
    public readonly promptId: string,
    public readonly content: string,
    public readonly version: number,
    public readonly createdAt: Date
  ) {}
}
