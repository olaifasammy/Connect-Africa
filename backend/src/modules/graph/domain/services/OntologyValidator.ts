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

  async validateCardinality(type: string, sourceTypeId: string): Promise<void> {
    const isAllowed = await this.ontologyGraphService.validateCardinality(type, sourceTypeId);
    if (!isAllowed) {
      throw new GraphValidationError(`Cardinality violation for relationship type: ${type}`);
    }
  }

  async validateMetadata(type: string, metadata: Record<string, any>): Promise<void> {
    const isSchemaValid = await this.ontologyGraphService.validateMetadataSchema(type, metadata);
    if (!isSchemaValid) {
      throw new GraphValidationError(`Metadata schema violation for type: ${type}`);
    }
  }
}
