import { IGraphRepository } from '../domain/repositories/IGraphRepository';
import { GraphNode, GraphEdge } from '../domain/entities/GraphEntities';
import { Pool } from 'pg';
export declare class PostgresGraphRepository implements IGraphRepository {
    private readonly db;
    constructor(db: Pool);
    runInTransaction<T>(callback: (client: any) => Promise<T>): Promise<T>;
    getNeighbors(entityId: string): Promise<{
        nodes: GraphNode[];
        edges: GraphEdge[];
    }>;
    findShortestPath(startEntityId: string, endEntityId: string): Promise<GraphNode[]>;
    saveNode(node: GraphNode): Promise<void>;
    findById(entityId: string): Promise<GraphNode | null>;
    updateNode(entityId: string, metadata: Record<string, any>): Promise<void>;
    deleteNode(entityId: string): Promise<void>;
    saveEdge(edge: GraphEdge): Promise<void>;
    deleteEdge(sourceEntityId: string, targetEntityId: string, relationshipType: string): Promise<void>;
    existsEdge(sourceEntityId: string, targetEntityId: string, relationshipType: string): Promise<boolean>;
    depthTraversal(entityId: string, maxDepth: number): Promise<GraphNode[]>;
    breadthTraversal(entityId: string, maxDepth: number): Promise<GraphNode[]>;
    findByLabel(label: string, limit: number, offset: number): Promise<GraphNode[]>;
    findByOntologyType(type: string, limit: number, offset: number): Promise<GraphNode[]>;
    findEdgesByType(typeId: string, limit: number, offset: number): Promise<GraphEdge[]>;
    filterByMetadata(criteria: Record<string, any>, limit: number, offset: number): Promise<GraphNode[]>;
}
