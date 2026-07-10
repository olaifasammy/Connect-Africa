import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { SearchOntologyQuery } from '../queries/SearchOntologyQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
export declare class SearchOntologyQueryHandler implements IQueryHandler<SearchOntologyQuery, OntologyDto[]> {
    private readonly ontologyRepository;
    constructor(ontologyRepository: IOntologyRepository);
    handle(query: SearchOntologyQuery): Promise<OntologyDto[]>;
}
