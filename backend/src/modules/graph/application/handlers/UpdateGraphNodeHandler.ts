import { UpdateGraphNodeCommand } from '../commands/UpdateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNodeUpdatedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class UpdateGraphNodeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: UpdateGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.repository.updateNode(command.entityId, command.metadata);
      
      await this.eventBus.publish(new GraphNodeUpdatedEvent(command.entityId, command.metadata));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_NODE',
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
        action: 'UPDATE_NODE',
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
