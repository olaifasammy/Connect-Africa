import { IGraphIntegrationService } from '../../domain/interfaces/IGraphIntegrationService';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { CreateGraphEdgeHandler } from '../../../graph/application/handlers/CreateGraphEdgeHandler';
export declare class SourceGraphIntegrationService implements IGraphIntegrationService {
    private readonly createEdgeHandler;
    constructor(createEdgeHandler: CreateGraphEdgeHandler);
    linkSourceToNode(sourceId: UniqueEntityId, nodeId: UniqueEntityId): Promise<void>;
    linkSourceToEdge(sourceId: UniqueEntityId, edgeId: UniqueEntityId): Promise<void>;
}
