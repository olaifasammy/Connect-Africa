import { IOntologyGraphService } from './IOntologyGraphService';
import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class OntologyGraphService implements IOntologyGraphService {
  constructor(
    private readonly entityTypeRepository: IEntityTypeRepository,
    private readonly relationshipTypeRepository: IRelationshipTypeRepository
  ) {}

  async validateEntityType(entityTypeId: string): Promise<boolean> {
    const entityType = await this.entityTypeRepository.findById(new UniqueEntityId(entityTypeId));
    return !!entityType;
  }

  async validateRelationshipType(
    relationshipTypeId: string,
    sourceEntityTypeId: string,
    targetEntityTypeId: string
  ): Promise<boolean> {
    const relType = await this.relationshipTypeRepository.findById(new UniqueEntityId(relationshipTypeId));
    if (!relType) return false;
    
    return (
      relType.sourceEntityTypeId.equals(new UniqueEntityId(sourceEntityTypeId)) &&
      relType.targetEntityTypeId.equals(new UniqueEntityId(targetEntityTypeId))
    );
  }
}
