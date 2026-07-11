import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';
import { GraphValidationError } from '../errors/GraphErrors';

export class OntologyValidator {
  constructor(private readonly ontologyGraphService: IOntologyGraphService) {}

  async validateNode(type: string): Promise<void> {
    const isValid = await this.ontologyGraphService.validateEntityType(type);
    if (!isValid) {
      throw new GraphValidationError(`Invalid entity type: ${type}`);
    }
  }

  async validateEdge(type: string, sourceTypeId: string, targetTypeId: string): Promise<void> {
    const isValid = await this.ontologyGraphService.validateRelationshipType(type, sourceTypeId, targetTypeId);
    if (!isValid) {
      throw new GraphValidationError(`Invalid relationship type or incompatible entity types: ${type}`);
    }
  }
}
