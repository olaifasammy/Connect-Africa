import { DeleteGraphNodeCommand } from '../commands/DeleteGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNodeDeletedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class DeleteGraphNodeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.repository.deleteNode(command.entityId);
      
      await this.eventBus.publish(new GraphNodeDeletedEvent(command.entityId));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'DELETE_NODE',
        actorId: userId,
        actorType: 'USER',
        resourceId: command.entityId,
        resourceType: 'GRAPH_NODE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'DELETE_NODE',
        actorId: userId,
        actorType: 'USER',
        resourceId: command.entityId,
        resourceType: 'GRAPH_NODE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error;
    }
  }
}
