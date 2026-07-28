import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListRelationshipTypesQuery } from '../queries/ListRelationshipTypesQuery';
import { RelationshipTypeDto } from '../dto/OntologyDtos';
import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';

export class ListRelationshipTypesQueryHandler implements IQueryHandler<ListRelationshipTypesQuery, RelationshipTypeDto[]> {
  constructor(private readonly relationshipTypeRepository: IRelationshipTypeRepository) {}

  async handle(query: ListRelationshipTypesQuery): Promise<RelationshipTypeDto[]> {
    // Assuming repository needs extension to support findByOntologyId
    return [];
  }
}
