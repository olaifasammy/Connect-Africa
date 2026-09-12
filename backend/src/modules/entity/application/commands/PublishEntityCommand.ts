export class PublishEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
