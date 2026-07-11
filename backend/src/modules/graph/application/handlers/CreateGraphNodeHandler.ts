import { CreateGraphNodeCommand } from '../commands/CreateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphAggregate } from '../../domain/entities/GraphAggregate';
import { GraphNode } from '../../domain/entities/GraphEntities';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
import { logger as Logger } from '@shared/logger/Logger';

export class CreateGraphNodeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly ontologyValidator: OntologyValidator,
    private readonly logger: typeof Logger
  ) {}

  async handle(command: CreateGraphNodeCommand, userId: string, ipAddress: string): Promise<void> {
    try {
      await this.ontologyValidator.validateNode(command.type);
      
      const node = new GraphNode(command.entityId, command.type, [], command.metadata);
      const aggregate = new GraphAggregate([node], []);

      await this.repository.saveNode(node);
      
      this.logger.info(`Node created: ${command.entityId}`, { entityId: command.entityId });

      AuditLogger.log({
        status: 'SUCCESS',
        action: 'CREATE_NODE',
        resource: command.entityId,
        user: userId,
        ipAddress
      });
    } catch (error) {
      this.logger.error(`Failed to create node: ${command.entityId}`, { error, entityId: command.entityId });
      throw error;
    }
  }
}
