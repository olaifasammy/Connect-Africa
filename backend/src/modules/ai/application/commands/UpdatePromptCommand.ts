export class UpdatePromptCommand {
  constructor(
    public readonly promptId: string,
    public readonly content: string
  ) {}
}
