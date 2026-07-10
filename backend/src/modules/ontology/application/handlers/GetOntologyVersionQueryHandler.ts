import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetOntologyVersionQuery } from '../queries/GetOntologyVersionQuery';
import { OntologyVersionDto } from '../dto/OntologyDtos';
import { IOntologyVersionRepository } from '@modules/ontology/domain/repositories/IOntologyVersionRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetOntologyVersionQueryHandler implements IQueryHandler<GetOntologyVersionQuery, OntologyVersionDto> {
  constructor(private readonly ontologyVersionRepository: IOntologyVersionRepository) {}

  async handle(query: GetOntologyVersionQuery): Promise<OntologyVersionDto> {
    const version = await this.ontologyVersionRepository.findById(new UniqueEntityId(query.id));
    if (!version) {
        throw new Error('Ontology Version not found');
    }
    return {
      id: version.id.toString(),
      version: version.version,
      isPublished: version.isPublished
    };
  }
}
