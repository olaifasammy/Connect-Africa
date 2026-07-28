export class TraverseGraphQuery {
  constructor(
    public readonly entityId: string,
    public readonly maxDepth: number,
    public readonly mode: 'depth' | 'breadth' = 'depth'
  ) {}
}
