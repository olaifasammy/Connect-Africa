import { GraphNode, GraphEdge } from './GraphEntities';
import { GraphNodeCreatedEvent, GraphNodeUpdatedEvent, GraphEdgeCreatedEvent, GraphNodeDeletedEvent, GraphEdgeUpdatedEvent, GraphEdgeDeletedEvent } from '../events/GraphEvents';
export type GraphDomainEvent = GraphNodeCreatedEvent | GraphNodeUpdatedEvent | GraphNodeDeletedEvent | GraphEdgeCreatedEvent | GraphEdgeUpdatedEvent | GraphEdgeDeletedEvent;
export declare class GraphAggregate {
    private readonly nodes;
    private readonly edges;
    private _domainEvents;
    constructor(nodes?: GraphNode[], edges?: GraphEdge[]);
    addNode(node: GraphNode): void;
    addEdge(edge: GraphEdge): void;
    updateNode(entityId: string, metadata: Record<string, any>): void;
    getDomainEvents(): GraphDomainEvent[];
    clearDomainEvents(): void;
}
