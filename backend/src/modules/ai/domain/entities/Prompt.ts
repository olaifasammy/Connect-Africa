export class Prompt {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly content: string,
    public readonly version: number
  ) {}
}
