export class ApproveEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
