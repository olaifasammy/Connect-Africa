export class RejectEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
