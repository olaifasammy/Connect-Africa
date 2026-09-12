import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ListRelationshipsQuery } from '../queries/RelationshipQueries';
import { RelationshipDto } from '../dto/RelationshipDto';
import { IRelationshipRepository } from '@modules/relationship/domain/repositories/IRelationshipRepository';

@provide(ListRelationshipsHandler, true)
@injectable()
export class ListRelationshipsHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly repository: IRelationshipRepository,
  ) {}

  async handle(
    query: ListRelationshipsQuery,
  ): Promise<RelationshipDto[]> {
    const relationships = await this.repository.list(
      query.limit,
      query.offset,
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
