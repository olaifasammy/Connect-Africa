import { IGraphIntegrationService } from '../../domain/interfaces/IGraphIntegrationService';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { CreateGraphEdgeHandler } from '@modules/graph/application/handlers/CreateGraphEdgeHandler';
import { CreateGraphEdgeCommand } from '@modules/graph/application/commands/CreateGraphEdgeCommand';

export class SourceGraphIntegrationService implements IGraphIntegrationService {
  constructor(private readonly createEdgeHandler: CreateGraphEdgeHandler) {}

  async linkSourceToNode(sourceId: UniqueEntityId, nodeId: UniqueEntityId): Promise<void> {
    const command = new CreateGraphEdgeCommand(sourceId.toString(), nodeId.toString(), 'SOURCE_OF_NODE');
    await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
  }

  async linkSourceToEdge(sourceId: UniqueEntityId, edgeId: UniqueEntityId): Promise<void> {
    const command = new CreateGraphEdgeCommand(sourceId.toString(), edgeId.toString(), 'SOURCE_OF_EDGE');
    await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
  }
}
