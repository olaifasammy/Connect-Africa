import { IGraphRepository } from '../domain/repositories/IGraphRepository';
import { GraphNode, GraphEdge } from '../domain/entities/GraphEntities';
import { Pool } from 'pg';
export declare class PostgresGraphRepository implements IGraphRepository {
    private readonly db;
    constructor(db: Pool);
    getNeighbors(entityId: string): Promise<{
        nodes: GraphNode[];
        edges: GraphEdge[];
    }>;
    findShortestPath(startEntityId: string, endEntityId: string): Promise<GraphNode[]>;
}
