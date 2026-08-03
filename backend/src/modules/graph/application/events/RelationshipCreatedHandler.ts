import { injectable, inject } from 'inversify';
import { RelationshipCreatedEvent } from '@modules/relationship/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';
import { OntologyValidator } from '../../domain/services/OntologyValidator';

@injectable()
export class RelationshipCreatedHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository,
    @inject(OntologyValidator) private readonly ontologyValidator: OntologyValidator
  ) {}

  async handle(event: RelationshipCreatedEvent): Promise<void> {
    await this.ontologyValidator.validateEdge(
      event.relationshipTypeId,
      event.sourceEntityId,
      event.targetEntityId
    );
    
    const edgeExists = await this.repository.existsEdge(
      event.sourceEntityId,
      event.targetEntityId,
      event.relationshipTypeId
    );
    
    if (!edgeExists) {
      const edge = new GraphEdge(
        event.sourceEntityId,
        event.targetEntityId,
        event.relationshipTypeId,
        {}
      );
      await this.repository.saveEdge(edge);
    }
  }
}
