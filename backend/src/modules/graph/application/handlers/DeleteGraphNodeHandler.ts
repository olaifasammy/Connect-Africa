import { DeleteGraphNodeCommand } from '../commands/DeleteGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class DeleteGraphNodeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(command: DeleteGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    await this.repository.deleteNode(command.entityId);
    
    AuditLogger.log({
      status: 'SUCCESS',
      action: 'DELETE_NODE',
      resource: command.entityId,
      user: userId,
      ipAddress
    });
  }
}
