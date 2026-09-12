export class FindShortestPathQuery {
  constructor(
    public readonly startEntityId: string,
    public readonly endEntityId: string
  ) {}
}
