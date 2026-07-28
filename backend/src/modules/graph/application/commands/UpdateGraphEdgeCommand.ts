export class UpdateGraphEdgeCommand {
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipType: string,
    public readonly properties: Record<string, any>
  ) {}
}
