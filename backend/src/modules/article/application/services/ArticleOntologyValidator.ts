import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArticleOntologyValidator {
  constructor(
    private readonly entityTypeRepository: IEntityTypeRepository,
    private readonly relationshipTypeRepository: IRelationshipTypeRepository
  ) {}

  async validateEntityType(typeName: string): Promise<boolean> {
    const type = await this.entityTypeRepository.findByName(typeName);
    return !!type;
  }

  async validateRelationshipType(typeName: string): Promise<boolean> {
    const type = await this.relationshipTypeRepository.findByName(typeName);
    return !!type;
  }
}
