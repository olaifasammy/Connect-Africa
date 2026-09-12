export class MergeEntitiesCommand {
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly userId: string
  ) {}
}
