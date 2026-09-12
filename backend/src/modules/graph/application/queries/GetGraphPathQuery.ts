export class GetGraphPathQuery {
  constructor(
    public readonly startEntityId: string,
    public readonly endEntityId: string
  ) {}
}
