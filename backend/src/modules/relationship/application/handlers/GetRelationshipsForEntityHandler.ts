import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { GetRelationshipsForEntityQuery } from '../queries/RelationshipQueries';
import { RelationshipDto } from '../dto/RelationshipDto';
import { IRelationshipRepository } from '@modules/relationship/domain/repositories/IRelationshipRepository';

@provide(GetRelationshipsForEntityHandler, true)
@injectable()
export class GetRelationshipsForEntityHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly repository: IRelationshipRepository,
  ) {}

  async handle(
    query: GetRelationshipsForEntityQuery,
  ): Promise<RelationshipDto[]> {
    const relationships = await this.repository.findByEntityId(
      query.entityId,
    );

    return relationships.map((relationship) => ({
      id: relationship.id.toString(),
      sourceEntityId: relationship.sourceEntityId.value,
      targetEntityId: relationship.targetEntityId.value,
      relationshipTypeId: relationship.relationshipTypeId.value,
      createdAt: relationship.createdAt,
    }));
  }
}
