export class ChangeThemeCommand {
  constructor(
    public readonly userId: string,
    public readonly theme: string
  ) {}
}
