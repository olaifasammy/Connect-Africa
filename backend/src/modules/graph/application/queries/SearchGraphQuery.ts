export class SearchGraphQuery {
  constructor(
    public readonly label?: string,
    public readonly limit: number = 20,
    public readonly offset: number = 0
  ) {}
}
