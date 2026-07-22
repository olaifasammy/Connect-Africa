import { CreateGraphNodeCommand } from '../commands/CreateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphAggregate } from '../../domain/entities/GraphAggregate';
import { GraphNode } from '../../domain/entities/GraphEntities';
import { GraphNodeCreatedEvent } from '../../domain/events/GraphEvents';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
import { logger as Logger } from '@shared/logger/Logger';

export class CreateGraphNodeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly ontologyValidator: OntologyValidator,
    private readonly eventBus: EventBus,
    private readonly logger: typeof Logger
  ) {}

  async handle(command: CreateGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.ontologyValidator.validateNode(command.type);
      await this.ontologyValidator.validateMetadata(command.type, command.metadata);
      
      const node = new GraphNode(command.entityId, command.type, [], command.metadata);
      
      await this.repository.saveNode(node);
      
      await this.eventBus.publish(new GraphNodeCreatedEvent(command.entityId, command.type));

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'CREATE_NODE',
        actorId: userId,
        actorType: 'USER',
        resourceId: command.entityId,
        resourceType: 'GRAPH_NODE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
      
      this.logger.info(`Node created: ${command.entityId}`, { entityId: command.entityId });
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'CREATE_NODE',
        actorId: userId,
        actorType: 'USER',
        resourceId: command.entityId,
        resourceType: 'GRAPH_NODE',
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      this.logger.error(`Failed to create node: ${command.entityId}`, { error, entityId: command.entityId });
      throw error;
    }
  }
}
