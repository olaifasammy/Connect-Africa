export class RegisterProviderCommand {
  constructor(
    public readonly name: string,
    public readonly priority: number
  ) {}
}
