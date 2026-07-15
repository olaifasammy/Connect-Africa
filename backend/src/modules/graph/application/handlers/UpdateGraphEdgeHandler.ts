import { UpdateGraphEdgeCommand } from '../commands/UpdateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { GraphAggregate } from '../../domain/entities/GraphAggregate';

export class UpdateGraphEdgeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(command: UpdateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    await this.repository.runInTransaction(async (client) => {
        // In a real implementation, we would load the aggregate here.
        // For now, we update the repository directly to perform the update.
        await this.repository.updateEdge(
            command.sourceEntityId,
            command.targetEntityId,
            command.relationshipType,
            command.properties
        );
        
        AuditLogger.log({
          status: 'SUCCESS',
          action: 'UPDATE_EDGE',
          resource: `${command.sourceEntityId}-${command.targetEntityId}`,
          user: userId,
          ipAddress
        });
    });
  }
}
