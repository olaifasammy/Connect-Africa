export class GetEdgeQuery {
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipType: string
  ) {}
}
