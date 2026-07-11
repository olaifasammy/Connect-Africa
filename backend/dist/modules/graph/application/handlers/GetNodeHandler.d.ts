import { GetNodeQuery } from '../queries/GetNodeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';
export declare class GetNodeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(query: GetNodeQuery): Promise<GraphNode | null>;
}
