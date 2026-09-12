export class Provider {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isEnabled: boolean,
    public readonly priority: number
  ) {}
}
