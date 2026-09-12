export class ArchiveEntityCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
