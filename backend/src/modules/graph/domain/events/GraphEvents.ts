export class GraphNodeCreatedEvent {
  constructor(public readonly nodeId: string, public readonly type: string) {}
}

export class GraphNodeUpdatedEvent {
  constructor(public readonly nodeId: string, public readonly metadata: Record<string, any>) {}
}

export class GraphNodeDeletedEvent {
  constructor(public readonly nodeId: string) {}
}

export class GraphEdgeCreatedEvent {
  constructor(
    public readonly sourceId: string,
    public readonly targetId: string,
    public readonly type: string
  ) {}
}

export class GraphEdgeUpdatedEvent {
  constructor(
    public readonly sourceId: string,
    public readonly targetId: string,
    public readonly type: string,
    public readonly properties: Record<string, any>
  ) {}
}

export class GraphEdgeDeletedEvent {
  constructor(
    public readonly sourceId: string,
    public readonly targetId: string,
    public readonly type: string
  ) {}
}
