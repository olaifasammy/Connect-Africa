import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListEntityTypesQuery } from '../queries/ListEntityTypesQuery';
import { EntityTypeDto } from '../dto/OntologyDtos';
import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

export class ListEntityTypesQueryHandler implements IQueryHandler<ListEntityTypesQuery, EntityTypeDto[]> {
  constructor(private readonly entityTypeRepository: IEntityTypeRepository) {}

  async handle(query: ListEntityTypesQuery): Promise<EntityTypeDto[]> {
      // Assuming repository needs extension to support findByOntologyId
      return [];
  }
}
