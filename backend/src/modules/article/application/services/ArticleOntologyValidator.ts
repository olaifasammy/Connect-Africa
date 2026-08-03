import { IOntologyGraphService } from '@modules/ontology/public';

export class ArticleOntologyValidator {
  constructor(
    private readonly ontologyGraphService: IOntologyGraphService
  ) {}

  async validateEntityType(typeId: string): Promise<boolean> {
    return await this.ontologyGraphService.validateEntityType(typeId);
  }

  async validateRelationshipType(relationshipTypeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<boolean> {
    return await this.ontologyGraphService.validateRelationshipType(
      relationshipTypeId,
      sourceEntityTypeId,
      targetEntityTypeId
    );
  }
}
