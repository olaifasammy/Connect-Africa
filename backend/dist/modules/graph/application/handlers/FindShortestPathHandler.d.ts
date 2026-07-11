import { FindShortestPathQuery } from '../queries/FindShortestPathQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';
export declare class FindShortestPathHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(query: FindShortestPathQuery): Promise<GraphNode[]>;
}
