export class AddAliasCommand {
  constructor(
    public readonly entityId: string,
    public readonly alias: string,
    public readonly userId: string
  ) {}
}
