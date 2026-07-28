import { GraphValidationError } from '../errors/GraphErrors';

export interface SourceCitation {
  sourceId: string;
  confidence: number;
  provenance: string;
}

export class GraphNode {
  constructor(
    public readonly entityId: string,
    public readonly type: string,
    public readonly labels: string[],
    public readonly metadata: Record<string, any>,
    public readonly sources: SourceCitation[] = []
  ) {
    this.validate();
  }

  public updateMetadata(newMetadata: Record<string, any>): void {
    Object.assign(this.metadata, newMetadata);
  }

  public addSource(source: SourceCitation): void {
    this.sources.push(source);
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
    public readonly relationshipType: string,
    public readonly properties: Record<string, any>,
    public readonly sources: SourceCitation[] = []
  ) {
    this.validate();
  }

  public addSource(source: SourceCitation): void {
    this.sources.push(source);
  }

  private validate(): void {
    if (!this.sourceEntityId || !this.targetEntityId || !this.relationshipType) {
      throw new GraphValidationError('Source, target, and relationship type are required');
    }
  }
}
