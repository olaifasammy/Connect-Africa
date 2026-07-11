import { UpdateGraphNodeCommand } from '../commands/UpdateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class UpdateGraphNodeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(command: UpdateGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    await this.repository.updateNode(command.entityId, command.metadata);
    
    AuditLogger.log({
      status: 'SUCCESS',
      action: 'UPDATE_NODE',
      resource: command.entityId,
      user: userId,
      ipAddress
    });
  }
}
