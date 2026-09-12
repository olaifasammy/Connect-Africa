import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { SearchOntologyQuery } from '../queries/SearchOntologyQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

@provide(SearchOntologyQueryHandler, true)
@injectable()
export class SearchOntologyQueryHandler implements IQueryHandler<SearchOntologyQuery, OntologyDto[]> {
  constructor(@inject('IOntologyRepository') private readonly ontologyRepository: IOntologyRepository) {}

  async handle(query: SearchOntologyQuery): Promise<OntologyDto[]> {
    // Requires search infrastructure implementation
    return [];
  }
}
