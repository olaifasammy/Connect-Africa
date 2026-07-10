import { GetGraphPathQuery } from '../queries/GetGraphPathQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class GetGraphPathHandler {
    private readonly graphRepository;
    constructor(graphRepository: IGraphRepository);
    handle(query: GetGraphPathQuery, userId: string, ipAddress: string): Promise<any>;
}
