import { IOntologyService } from '@modules/relationship/domain/interfaces/RelationshipServices';
import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';

export class OntologyIntegrationService implements IOntologyService {
  constructor(private readonly ontologyGraphService: IOntologyGraphService) {}

  async validateRelationshipType(
    typeId: string,
    sourceEntityTypeId: string,
    targetEntityTypeId: string
  ): Promise<void> {
    const isValid = await this.ontologyGraphService.validateRelationshipType(
      typeId,
      sourceEntityTypeId,
      targetEntityTypeId
    );
    
    if (!isValid) {
      throw new Error(`Invalid relationship type: ${typeId}`);
    }
  }
}
