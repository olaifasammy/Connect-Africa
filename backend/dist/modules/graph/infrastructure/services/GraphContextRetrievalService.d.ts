import { IGraphContextRetrievalService } from '../../application/services/IGraphContextRetrievalService';
import { IGraphRepository } from '../../../graph/domain/repositories/IGraphRepository';
export declare class GraphContextRetrievalService implements IGraphContextRetrievalService {
    private readonly graphRepository;
    constructor(graphRepository: IGraphRepository);
    getContext(entityId: string): Promise<any>;
}
