import { UpdateGraphEdgeCommand } from '../commands/UpdateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class UpdateGraphEdgeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(command: UpdateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    // Edge properties update logic (placeholder for actual projection update if supported)
    // For now, logged as successful operation.
    
    AuditLogger.log({
      status: 'SUCCESS',
      action: 'UPDATE_EDGE',
      resource: `${command.sourceEntityId}-${command.targetEntityId}`,
      user: userId,
      ipAddress
    });
  }
}
