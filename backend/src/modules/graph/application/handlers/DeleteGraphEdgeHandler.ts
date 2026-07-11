import { DeleteGraphEdgeCommand } from '../commands/DeleteGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class DeleteGraphEdgeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(command: DeleteGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    await this.repository.deleteEdge(
        command.sourceEntityId, 
        command.targetEntityId, 
        command.relationshipType
    );
    
    AuditLogger.log({
      status: 'SUCCESS',
      action: 'DELETE_EDGE',
      resource: `${command.sourceEntityId}-${command.targetEntityId}`,
      user: userId,
      ipAddress
    });
  }
}
