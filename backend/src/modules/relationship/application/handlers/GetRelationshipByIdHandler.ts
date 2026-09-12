import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { GetRelationshipQuery } from '../queries/RelationshipQueries';
import { RelationshipDto } from '../dto/RelationshipDto';
import { IRelationshipRepository } from '@modules/relationship/domain/repositories/IRelationshipRepository';
import { RelationshipId } from '@modules/relationship/domain/value-objects/RelationshipValueObjects';

@provide(GetRelationshipByIdHandler, true)
@injectable()
export class GetRelationshipByIdHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly repository: IRelationshipRepository,
  ) {}

  async handle(
    query: GetRelationshipQuery,
  ): Promise<RelationshipDto | null> {
    const relationship = await this.repository.findById(
      new RelationshipId(query.id),
    );

    if (!relationship) {
      return null;
    }

    return {
      id: relationship.id.toString(),
      sourceEntityId: relationship.sourceEntityId.value,
      targetEntityId: relationship.targetEntityId.value,
      relationshipTypeId: relationship.relationshipTypeId.value,
      createdAt: relationship.createdAt,
    };
  }
}
