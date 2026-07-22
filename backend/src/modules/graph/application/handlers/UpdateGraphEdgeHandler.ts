import { UpdateGraphEdgeCommand } from '../commands/UpdateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdgeUpdatedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class UpdateGraphEdgeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: UpdateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.repository.runInTransaction(async (client) => {
        await this.repository.updateEdge(
            command.sourceEntityId,
            command.targetEntityId,
            command.relationshipType,
            command.properties
        );
      });
        
      await this.eventBus.publish(new GraphEdgeUpdatedEvent(
        command.sourceEntityId,
        command.targetEntityId,
        command.relationshipType,
        command.properties
      ));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_EDGE',
        actorId: userId,
        actorType: 'USER',
        resourceId: `${command.sourceEntityId}-${command.targetEntityId}`,
        resourceType: 'GRAPH_EDGE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_EDGE',
        actorId: userId,
        actorType: 'USER',
        resourceId: `${command.sourceEntityId}-${command.targetEntityId}`,
        resourceType: 'GRAPH_EDGE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error;
    }
  }
}
