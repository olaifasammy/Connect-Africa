import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IGraphIntegrationService {
    linkSourceToNode(sourceId: UniqueEntityId, nodeId: UniqueEntityId): Promise<void>;
    linkSourceToEdge(sourceId: UniqueEntityId, edgeId: UniqueEntityId): Promise<void>;
}
