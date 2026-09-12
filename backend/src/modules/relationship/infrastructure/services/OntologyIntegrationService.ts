import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IOntologyService } from '@modules/relationship/domain/interfaces/RelationshipServices';
import { IOntologyGraphService } from '@modules/ontology/public';

@provide('IOntologyService', true)
@injectable()
export class OntologyIntegrationService implements IOntologyService {
  constructor(@inject('IOntologyGraphService') private readonly ontologyGraphService: IOntologyGraphService) {}

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
