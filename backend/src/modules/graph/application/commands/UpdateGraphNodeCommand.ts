export class UpdateGraphNodeCommand {
  constructor(
    public readonly entityId: string,
    public readonly metadata: Record<string, any>
  ) {}
}
