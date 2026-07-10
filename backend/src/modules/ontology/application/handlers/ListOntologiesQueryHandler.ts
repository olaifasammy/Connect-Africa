import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListOntologiesQuery } from '../queries/ListOntologiesQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

export class ListOntologiesQueryHandler implements IQueryHandler<ListOntologiesQuery, OntologyDto[]> {
  constructor(private readonly ontologyRepository: IOntologyRepository) {}

  async handle(query: ListOntologiesQuery): Promise<OntologyDto[]> {
    const limit = query.limit || 10;
    const offset = query.offset || 0;
    const ontologies = await this.ontologyRepository.findAll(limit, offset);
    return ontologies.map(ontology => ({
      id: ontology.id.toString(),
      name: ontology.name,
      description: ontology.description,
      version: ontology.version
    }));
  }
}
