import { IQueryHandler } from '../../../../shared/application/handlers/IQueryHandler';
import { GetOntologyQuery } from '../queries/GetOntologyQuery';
import { OntologyDto } from '../dto/OntologyDto';
import { OntologyService } from '../services/OntologyService';
export declare class GetOntologyQueryHandler implements IQueryHandler<GetOntologyQuery, OntologyDto> {
    private readonly ontologyService;
    constructor(ontologyService: OntologyService);
    handle(query: GetOntologyQuery): Promise<OntologyDto>;
}
