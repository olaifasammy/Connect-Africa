import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';

import { ListRelationshipTypesQuery } from '../queries/ListRelationshipTypesQuery';
import { RelationshipTypeDto } from '../dto/OntologyDtos';

import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

@provide(ListRelationshipTypesQueryHandler, true)
@injectable()
export class ListRelationshipTypesQueryHandler
  implements
    IQueryHandler<
      ListRelationshipTypesQuery,
      RelationshipTypeDto[]
    >
{
  constructor(
    @inject('IRelationshipTypeRepository')
    private readonly relationshipTypeRepository: IRelationshipTypeRepository,
  ) {}

  async handle(
    query: ListRelationshipTypesQuery,
  ): Promise<RelationshipTypeDto[]> {
    const ontologyId =
      OntologyId.create(query.ontologyId);

    const relationshipTypes =
      await this.relationshipTypeRepository.findByOntologyId(
        ontologyId,
      );

    return relationshipTypes.map(
      (relationshipType): RelationshipTypeDto => ({
        id: relationshipType.id.toString(),
        name: relationshipType.name,
        description: relationshipType.description,
        sourceEntityTypeId:
          relationshipType.sourceEntityTypeId.toString(),
        targetEntityTypeId:
          relationshipType.targetEntityTypeId.toString(),
      }),
    );
  }
}