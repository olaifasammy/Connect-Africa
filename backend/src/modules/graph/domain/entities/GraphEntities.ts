import { GraphValidationError } from '../errors/GraphErrors';

export class GraphNode {
  constructor(
    public readonly entityId: string,
    public readonly type: string,
    public readonly metadata: Record<string, any>
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.entityId || this.entityId.length === 0) {
      throw new GraphValidationError('Entity ID is required');
    }
    if (!this.type || this.type.length === 0) {
      throw new GraphValidationError('Entity type is required');
    }
  }
}

export class GraphEdge {
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipType: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.sourceEntityId || !this.targetEntityId || !this.relationshipType) {
      throw new GraphValidationError('Source, target, and relationship type are required');
    }
  }
}
