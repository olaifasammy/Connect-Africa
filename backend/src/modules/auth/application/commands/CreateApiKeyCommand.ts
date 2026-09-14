export class CreateApiKeyCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly scopes: string[],
    public readonly expiresInDays?: number
  ) {}
}
