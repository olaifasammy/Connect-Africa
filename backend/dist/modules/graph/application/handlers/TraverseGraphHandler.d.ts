import { TraverseGraphQuery } from '../queries/TraverseGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';
export declare class TraverseGraphHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(query: TraverseGraphQuery): Promise<GraphNode[]>;
}
