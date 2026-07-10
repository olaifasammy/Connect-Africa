import { GraphNode, GraphEdge } from '../entities/GraphEntities';

export interface IGraphRepository {
  getNeighbors(entityId: string): Promise<{ nodes: GraphNode[], edges: GraphEdge[] }>;
  findShortestPath(startEntityId: string, endEntityId: string): Promise<GraphNode[]>;
}
