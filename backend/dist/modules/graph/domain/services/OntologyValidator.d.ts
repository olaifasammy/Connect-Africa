import { IOntologyGraphService } from '../../../ontology/application/services/IOntologyGraphService';
export declare class OntologyValidator {
    private readonly ontologyGraphService;
    constructor(ontologyGraphService: IOntologyGraphService);
    validateNode(type: string): Promise<void>;
    validateEdge(type: string, sourceTypeId: string, targetTypeId: string): Promise<void>;
}
