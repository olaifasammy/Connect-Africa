import { GraphNode, GraphEdge } from './GraphEntities';
import { 
  GraphNodeCreatedEvent, 
  GraphNodeUpdatedEvent, 
  GraphEdgeCreatedEvent,
  GraphNodeDeletedEvent,
  GraphEdgeUpdatedEvent,
  GraphEdgeDeletedEvent 
} from '../events/GraphEvents';
import { UniqueNodePolicy } from '../policies/UniqueNodePolicy';

export type GraphDomainEvent = 
  | GraphNodeCreatedEvent 
  | GraphNodeUpdatedEvent 
  | GraphNodeDeletedEvent 
  | GraphEdgeCreatedEvent
  | GraphEdgeUpdatedEvent
  | GraphEdgeDeletedEvent;

export class GraphAggregate {
  private _domainEvents: GraphDomainEvent[] = [];

  constructor(
    private readonly nodes: GraphNode[] = [],
    private readonly edges: GraphEdge[] = []
  ) {}

  public addNode(node: GraphNode): void {
    if (!UniqueNodePolicy.check(this.nodes, node)) {
      throw new Error('Node already exists in aggregate');
    }
    this.nodes.push(node);
    this._domainEvents.push(new GraphNodeCreatedEvent(node.entityId, node.type));
  }

  public addEdge(edge: GraphEdge): void {
    if (!this.nodes.some(n => n.entityId === edge.sourceEntityId) || 
        !this.nodes.some(n => n.entityId === edge.targetEntityId)) {
        throw new Error('Source or target node does not exist in aggregate');
    }
    
    if (this.edges.some(e => e.sourceEntityId === edge.sourceEntityId && 
                            e.targetEntityId === edge.targetEntityId && 
                            e.relationshipType === edge.relationshipType)) {
        throw new Error('Edge already exists in aggregate');
    }

    this.edges.push(edge);
    this._domainEvents.push(new GraphEdgeCreatedEvent(edge.sourceEntityId, edge.targetEntityId, edge.relationshipType));
  }

  public updateNode(entityId: string, metadata: Record<string, any>): void {
    const node = this.nodes.find(n => n.entityId === entityId);
    if (!node) {
      throw new Error('Node not found');
    }
    node.updateMetadata(metadata);
    this._domainEvents.push(new GraphNodeUpdatedEvent(entityId, metadata));
  }

  public getDomainEvents(): GraphDomainEvent[] {
    return [...this._domainEvents];
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
