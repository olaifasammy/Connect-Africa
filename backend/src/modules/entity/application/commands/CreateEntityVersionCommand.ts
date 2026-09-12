export class CreateEntityVersionCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
