import { CreateGraphEdgeCommand } from '../commands/CreateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';
import { GraphEdgeCreatedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { OntologyValidator } from '../../domain/services/OntologyValidator';

export class CreateGraphEdgeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly ontologyValidator: OntologyValidator,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      const sourceNode = await this.repository.findById(command.sourceEntityId);
      const targetNode = await this.repository.findById(command.targetEntityId);

      if (!sourceNode || !targetNode) {
        throw new Error('Source or target node not found');
      }

      await this.ontologyValidator.validateEdge(command.relationshipType, sourceNode.type, targetNode.type);
      await this.ontologyValidator.validateCardinality(command.relationshipType, sourceNode.type);

      const edge = new GraphEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, {});

      await this.repository.saveEdge(edge);
      
      await this.eventBus.publish(new GraphEdgeCreatedEvent(command.sourceEntityId, command.targetEntityId, command.relationshipType));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'CREATE_EDGE',
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
        action: 'CREATE_EDGE',
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
