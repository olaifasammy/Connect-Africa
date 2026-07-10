export class DeleteEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
