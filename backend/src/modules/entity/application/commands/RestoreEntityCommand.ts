export class RestoreEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
