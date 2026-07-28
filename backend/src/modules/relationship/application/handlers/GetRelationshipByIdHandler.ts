import { GetRelationshipQuery } from '../queries/RelationshipQueries';
import { IRelationshipRepository } from '@modules/relationship/domain/repositories/IRelationshipRepository';
import { RelationshipDto } from '../dto/RelationshipDto';
import { RelationshipId } from '@modules/relationship/domain/value-objects/RelationshipValueObjects';

export class GetRelationshipByIdHandler {
  constructor(private readonly repository: IRelationshipRepository) {}

  async handle(query: GetRelationshipQuery): Promise<RelationshipDto | null> {
    const relationship = await this.repository.findById(new RelationshipId(query.id));
    if (!relationship) return null;
    
    return {
      id: relationship.id.toString(),
      sourceEntityId: relationship.sourceEntityId.getProps().value,
      targetEntityId: relationship.targetEntityId.getProps().value,
      relationshipTypeId: relationship.relationshipTypeId.getProps().value,
      status: 'ACTIVE',
      createdAt: relationship.createdAt,
      updatedAt: relationship.createdAt
    };
  }
}
