export class RollbackPromptCommand {
  constructor(
    public readonly promptId: string,
    public readonly version: number
  ) {}
}
