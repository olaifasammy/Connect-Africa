import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetOntologyVersionQuery } from '../queries/GetOntologyVersionQuery';
import { OntologyVersionDto } from '../dto/OntologyDtos';
import { IOntologyVersionRepository } from '../../../ontology/domain/repositories/IOntologyVersionRepository';
export declare class GetOntologyVersionQueryHandler implements IQueryHandler<GetOntologyVersionQuery, OntologyVersionDto> {
    private readonly ontologyVersionRepository;
    constructor(ontologyVersionRepository: IOntologyVersionRepository);
    handle(query: GetOntologyVersionQuery): Promise<OntologyVersionDto>;
}
