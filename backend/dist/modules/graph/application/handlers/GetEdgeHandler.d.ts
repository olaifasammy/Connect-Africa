import { GetEdgeQuery } from '../queries/GetEdgeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';
export declare class GetEdgeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(query: GetEdgeQuery): Promise<GraphEdge | null>;
}
