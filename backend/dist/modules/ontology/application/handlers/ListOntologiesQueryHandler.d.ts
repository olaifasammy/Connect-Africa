import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { ListOntologiesQuery } from '../queries/ListOntologiesQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
export declare class ListOntologiesQueryHandler implements IQueryHandler<ListOntologiesQuery, OntologyDto[]> {
    private readonly ontologyRepository;
    constructor(ontologyRepository: IOntologyRepository);
    handle(query: ListOntologiesQuery): Promise<OntologyDto[]>;
}
