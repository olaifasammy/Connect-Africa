import { DeleteGraphEdgeCommand } from '../commands/DeleteGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdgeDeletedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class DeleteGraphEdgeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.repository.deleteEdge(
          command.sourceEntityId, 
          command.targetEntityId, 
          command.relationshipType
      );
      
      await this.eventBus.publish(new GraphEdgeDeletedEvent(
        command.sourceEntityId, 
        command.targetEntityId, 
        command.relationshipType
      ));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'DELETE_EDGE',
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
        action: 'DELETE_EDGE',
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
