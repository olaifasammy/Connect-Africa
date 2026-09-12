export class RemoveAliasCommand {
  constructor(
    public readonly entityId: string,
    public readonly alias: string,
    public readonly userId: string
  ) {}
}
