import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetRelationshipTypeQuery } from '../queries/GetRelationshipTypeQuery';
import { RelationshipTypeDto } from '../dto/OntologyDtos';
import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(GetRelationshipTypeQueryHandler, true)
@injectable()
export class GetRelationshipTypeQueryHandler implements IQueryHandler<GetRelationshipTypeQuery, RelationshipTypeDto> {
  constructor(@inject('IRelationshipTypeRepository') private readonly relationshipTypeRepository: IRelationshipTypeRepository) {}

  async handle(query: GetRelationshipTypeQuery): Promise<RelationshipTypeDto> {
    const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId(query.id));
    if (!relationshipType) {
        throw new Error('Relationship Type not found');
    }
    return {
      id: relationshipType.id.toString(),
      name: relationshipType.name,
      description: relationshipType.description,
      sourceEntityTypeId: relationshipType.sourceEntityTypeId.toString(),
      targetEntityTypeId: relationshipType.targetEntityTypeId.toString()
    };
  }
}
