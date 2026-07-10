import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { SearchOntologyQuery } from '../queries/SearchOntologyQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

export class SearchOntologyQueryHandler implements IQueryHandler<SearchOntologyQuery, OntologyDto[]> {
  constructor(private readonly ontologyRepository: IOntologyRepository) {}

  async handle(query: SearchOntologyQuery): Promise<OntologyDto[]> {
    // Requires search infrastructure implementation
    return [];
  }
}
