import { CreateGraphEdgeCommand } from '../commands/CreateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphAggregate } from '../../domain/entities/GraphAggregate';
import { GraphEdge } from '../../domain/entities/GraphEntities';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { OntologyValidator } from '../../domain/services/OntologyValidator';

export class CreateGraphEdgeHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly ontologyValidator: OntologyValidator
  ) {}

  async handle(command: CreateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void> {
    const sourceNode = await this.repository.findById(command.sourceEntityId);
    const targetNode = await this.repository.findById(command.targetEntityId);

    if (!sourceNode || !targetNode) {
      throw new Error('Source or target node not found');
    }

    await this.ontologyValidator.validateEdge(command.relationshipType, sourceNode.type, targetNode.type);
    await this.ontologyValidator.validateCardinality(command.relationshipType, sourceNode.type);

    const edge = new GraphEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, {});
    const aggregate = new GraphAggregate([], [edge]);

    await this.repository.saveEdge(edge);
    
    AuditLogger.log({
      status: 'SUCCESS',
      action: 'CREATE_EDGE',
      resource: `${command.sourceEntityId}-${command.targetEntityId}`,
      user: userId,
      ipAddress
    });
  }
}
