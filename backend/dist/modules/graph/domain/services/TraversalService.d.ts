import { IGraphRepository } from '../repositories/IGraphRepository';
import { GraphNode } from '../entities/GraphEntities';
export declare class TraversalService {
    private readonly graphRepository;
    constructor(graphRepository: IGraphRepository);
    getContextualNeighbors(entityId: string): Promise<GraphNode[]>;
}
