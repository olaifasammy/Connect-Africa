import { SearchGraphQuery } from '../queries/SearchGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';
export declare class SearchGraphHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(query: SearchGraphQuery): Promise<GraphNode[]>;
}
