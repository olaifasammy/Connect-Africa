export class CreateGraphNodeCommand {
  constructor(
    public readonly entityId: string,
    public readonly type: string,
    public readonly metadata: Record<string, any>
  ) {}
}
