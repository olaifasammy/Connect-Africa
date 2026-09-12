import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetOntologyQuery } from '../queries/GetOntologyQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { OntologyService } from '../services/OntologyService';

@provide(GetOntologyQueryHandler, true)
@injectable()
export class GetOntologyQueryHandler implements IQueryHandler<GetOntologyQuery, OntologyDto> {
  constructor(private readonly ontologyService: OntologyService) {}

  async handle(query: GetOntologyQuery): Promise<OntologyDto> {
    const ontology = await this.ontologyService.getById(query.id);
    return {
      id: ontology.id.toString(),
      name: ontology.name,
      description: ontology.description,
      version: ontology.version
    };
  }
}
