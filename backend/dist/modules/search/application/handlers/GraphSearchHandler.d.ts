import { IGraphRepository } from '../../../graph/domain/repositories/IGraphRepository';
export interface GraphSearchQuery {
    type: 'neighbors' | 'path' | 'chain';
    entityId?: string;
    startEntityId?: string;
    endEntityId?: string;
    maxDepth?: number;
}
export interface GraphSearchResult {
    nodes: any[];
    edges: any[];
}
export declare class GraphSearchHandler {
    private readonly graphRepository;
    constructor(graphRepository: IGraphRepository);
    handle(query: GraphSearchQuery): Promise<GraphSearchResult>;
}
