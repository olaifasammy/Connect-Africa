import { IOntologyService } from '../../../relationship/domain/interfaces/RelationshipServices';
import { IOntologyGraphService } from '../../../ontology/application/services/IOntologyGraphService';
export declare class OntologyIntegrationService implements IOntologyService {
    private readonly ontologyGraphService;
    constructor(ontologyGraphService: IOntologyGraphService);
    validateRelationshipType(typeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<void>;
}
